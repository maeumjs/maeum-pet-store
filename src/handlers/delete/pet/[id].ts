import type { IDeletePetParamsDto, IDeletePetQuerystringDto } from '#/dto/v1/pet/IDeletePet';
import { del } from '#/repository/pet';
import { ApiErrorJsonSchema, ApiValidationErrorJsonSchema } from '@maeum/error-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Pet'],
    summary: 'Delete Pet',
    operationId: 'delete-pet',
    description: 'Delete Pet using id',
    querystring: { $ref: 'IDeletePetQuerystringDto' },
    params: { $ref: 'IDeletePetParamsDto' },
    response: {
      200: { $ref: 'IPetDto' },
      400: ApiValidationErrorJsonSchema,
      500: ApiErrorJsonSchema,
    },
  },
};

export default async function handler(
  req: FastifyRequest<{
    Querystring: IDeletePetQuerystringDto;
    Params: IDeletePetParamsDto;
  }>,
) {
  const pet = await del(req.query, req.params);
  return pet;
}
