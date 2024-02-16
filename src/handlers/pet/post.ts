import { insert } from '#/databases/repository/v1/pet/insert';
import { selectById } from '#/databases/repository/v1/pet/selectById';
import type { IPostPetBodyDto, IPostPetQuerystringDto } from '#/dto/v1/pet/IPostPet';
import { ApiErrorJsonSchema, ApiValidationErrorJsonSchema } from '@maeum/error-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Pet'],
    summary: 'Create Pet',
    operationId: 'create-pet',
    description: 'Create Pet',
    querystring: { $ref: 'IPostPetQuerystringDto' },
    body: { $ref: 'IPostPetBodyDto' },
    response: {
      200: { $ref: 'IPetDto' },
      400: ApiValidationErrorJsonSchema,
      500: ApiErrorJsonSchema,
    },
  },
};

export async function handler(
  req: FastifyRequest<{ Querystring: IPostPetQuerystringDto; Body: IPostPetBodyDto }>,
) {
  const result = await insert({
    values: {
      ...req.body,
    },
  });

  const pet = await selectById({ id: result.id });
  return pet;
}
