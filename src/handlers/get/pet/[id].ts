import type { IGetPetParamsDto, IGetPetQuerystringDto } from '#/dto/v1/pet/IGetPet';
import { read } from '#/repository/pet';
import {
  ApiError,
  ApiErrorJsonSchema,
  ApiValidationErrorJsonSchema,
} from '@maeum/error-controller';
import type { I18nParameters } from '@maeum/i18n-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Pet'],
    summary: 'Read Pet',
    operationId: 'read-pet',
    description: 'Read Pet using id',
    querystring: { $ref: 'IGetPetQuerystringDto' },
    params: { $ref: 'IGetPetParamsDto' },
    response: {
      200: { $ref: 'IPetDto' },
      400: ApiValidationErrorJsonSchema,
      500: ApiErrorJsonSchema,
    },
  },
};

export default async function handler(
  req: FastifyRequest<{ Querystring: IGetPetQuerystringDto; Params: IGetPetParamsDto }>,
) {
  const pet = await read(req.query, req.params);

  if (pet == null) {
    throw new ApiError({
      i18n: {
        phrase: 'pet-store.not-found-pet',
        option: { id: req.params.id },
      } satisfies I18nParameters,
      status: 404,
      $option: {
        logging: {
          message: 'i am additional information',
        },
      },
    });
  }

  return pet;
}
