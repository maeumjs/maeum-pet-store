import type { IPostPetBodyDto, IPostPetQuerystringDto } from '#/dto/v1/pet/IPostPet';
import { create } from '#/repository/pet';
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
  const pet = await create(req.body);
  return pet;
}
