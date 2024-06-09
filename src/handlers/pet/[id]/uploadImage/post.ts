import { CE_IMAGE_REFERENCE_ENTITY } from '#/databases/const-enum/CE_IMAGE_REFERENCE_ENTITY';
import { getInsertedIdOrThrow } from '#/databases/modules/getInsertedId';
import { insert } from '#/databases/repository/v1/images/insert';
import { selectById } from '#/databases/repository/v1/images/selectById';
import type {
  IPostUploadImagePetBodyMultipartDto,
  IPostUploadImagePetParamDto,
  IPostUploadImagePetQuerystringDto,
} from '#/dto/v1/pet/IPostUploadImagePet';
import { container } from '#/modules/di/container';
import type { MultipartFile } from '@fastify/multipart';
import { ApiErrorJsonSchema, ApiValidationErrorJsonSchema } from '@maeum/error-controller';
import { CE_DI as LOGGING_CONTROLLER } from '@maeum/logging-controller';
import { CE_DI as SCHEMA_CONTROLLER } from '@maeum/schema-controller';
import type {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
  RawServerBase,
  RouteShorthandOptions,
} from 'fastify';
import { exists } from 'my-node-fp';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import type { SetOptional } from 'type-fest';

const log = container.resolve(LOGGING_CONTROLLER.MAEUM_LOGGERS).l(import.meta.filename);

export const option: RouteShorthandOptions<
  RawServerBase,
  IncomingMessage,
  ServerResponse,
  { Body: SetOptional<IPostUploadImagePetBodyMultipartDto, '$file'> }
> = {
  schema: {
    tags: ['Pet'],
    summary: 'uploads an image',
    operationId: 'upload-pet-image',
    description: 'upload an image for Pet',
    consumes: ['multipart/form-data'],
    // 아래처럼 단순 문자열만 전달하면, Fastify에서 알아서 이걸 형태를 바꿔 버린다.
    // querystring: 'IPostUploadImagePetQuerystringDto' 이 값을
    // { type: "object", properties: "IPostUploadImagePetQuerystringDto", } 이렇게 바꿔 버린다
    // 그래서 단순 문자열을 전달하면 오류가 발생한다
    // 심지어 { $id: 'IPostUploadImagePetQuerystringDto' }, 이것도 마음대로 바꾼다
    // { type: "object", properties: { $id: 'IPostUploadImagePetQuerystringDto' } } 이렇게;;;
    querystring: { $ref: 'IPostUploadImagePetQuerystringDto' },
    params: { $ref: 'IPostUploadImagePetParamDto' },
    body: { $ref: 'IPostUploadImagePetBodyDto' },
    response: {
      200: { $ref: 'IImageDto' },
      400: ApiValidationErrorJsonSchema,
      500: ApiErrorJsonSchema,
    },
  },
  preValidation: (
    req: FastifyRequest<{ Body: SetOptional<IPostUploadImagePetBodyMultipartDto, '$file'> }>,
    _reply: FastifyReply,
    done: HookHandlerDoneFunction,
  ) => {
    try {
      const ajv = container.resolve(SCHEMA_CONTROLLER.AJV);
      const { body } = req;
      body.$file = body.file as unknown as MultipartFile;
      body.file = body.$file.filename;
      const result = ajv.getValidatorOrThrow('fileUploadSchema')(body.$file);
      if (!result) {
        throw new Error('validation error');
      }
    } finally {
      done();
    }
  },
};

export async function handler(
  req: FastifyRequest<{
    Querystring: IPostUploadImagePetQuerystringDto;
    Params: IPostUploadImagePetParamDto;
    Body: IPostUploadImagePetBodyMultipartDto;
  }>,
) {
  const source = req.body.$file.filename as unknown as string;
  const hash = `${randomUUID()}-${randomUUID()}-${randomUUID()}-${randomUUID()}${path.extname(
    source,
  )}`;
  const dirPath = path.join(process.cwd(), 'resources', 'images');

  if (!(await exists(dirPath))) {
    await fs.promises.mkdir(dirPath, { recursive: true });
  }

  const buf = await req.body.$file.toBuffer();

  await fs.promises.writeFile(path.join(dirPath, hash), buf);

  log.$('file size: ', buf.length);

  const result = await insert({
    refId: req.params.id,
    metadata: { filename: req.body.$file.filename },
    entity: CE_IMAGE_REFERENCE_ENTITY.PET,
    source,
    hash,
  });

  const id = getInsertedIdOrThrow(result);
  const image = await selectById({ id: `${id}` });

  return image;
}
