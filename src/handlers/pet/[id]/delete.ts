import { deleteById } from '#/databases/repository/v1/pet/deleteById';
import { selectById } from '#/databases/repository/v1/pet/selectById';
import type { IDeletePetParamsDto, IDeletePetQuerystringDto } from '#/dto/v1/pet/IDeletePet';
import {
  ApiError,
  ApiErrorJsonSchema,
  ApiValidationErrorJsonSchema,
} from '@maeum/error-controller';
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

export async function handler(
  req: FastifyRequest<{
    Querystring: IDeletePetQuerystringDto;
    Params: IDeletePetParamsDto;
  }>,
) {
  const pet = await selectById({ id: req.params.id });

  if (pet == null) {
    throw new ApiError({});
  }

  await deleteById({ id: req.params.id });

  return pet;
}
