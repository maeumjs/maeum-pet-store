import type {
  IPostUploadImagePetBodyMultipartDto,
  IPostUploadImagePetParamDto,
  IPostUploadImagePetQuerystringDto,
} from '#/dto/v1/pet/IPostUploadImagePet';
import { create } from '#/repository/image';
import type { MultipartFile } from '@fastify/multipart';
import { ApiErrorJsonSchema, ApiValidationErrorJsonSchema } from '@maeum/error-controller';
import { WinstonContainer } from '@maeum/logging-controller';
import { SchemaController } from '@maeum/schema-controller';
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

const log = WinstonContainer.l(__filename);

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
      const { body } = req;
      body.$file = body.file as unknown as MultipartFile;
      body.file = body.$file.filename;
      const result = SchemaController.it.getValidator('fileUploadSchema')(body.$file);
      if (!result) {
        throw new Error('validation error');
      }
    } finally {
      done();
    }
  },
};

export default async function handler(
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

  const image = await create(req.query, req.params, req.body, source, hash);

  return image;
}
