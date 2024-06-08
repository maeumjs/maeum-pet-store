import { selectById } from '#/databases/repository/v1/pet/selectById';
import type { IGetPetParamsDto, IGetPetQuerystringDto } from '#/dto/v1/pet/IGetPet';
import {
  ApiError,
  ApiErrorJsonSchema,
  ApiValidationErrorJsonSchema,
} from '@maeum/error-controller';
import type { II18nParameters } from '@maeum/i18n-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';
import httpStatusCodes from 'http-status-codes';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Pet'],
    summary: 'Read Pet',
    operationId: 'read-pet',
    description: 'Read Pet using id',
    querystring: { $ref: 'IGetPetQuerystringDto' },
    params: { $ref: 'IGetPetParamsDto' },
    response: {
      [httpStatusCodes.OK]: { $ref: 'IPetDto' },
      [httpStatusCodes.BAD_REQUEST]: ApiValidationErrorJsonSchema,
      [httpStatusCodes.INTERNAL_SERVER_ERROR]: ApiErrorJsonSchema,
    },
  },
};

export async function handler(
  req: FastifyRequest<{ Querystring: IGetPetQuerystringDto; Params: IGetPetParamsDto }>,
) {
  const pet = await selectById({ id: req.params.id });

  if (pet == null) {
    throw new ApiError({
      i18n: {
        phrase: 'pet-store.not-found-pet',
        option: { id: req.params.id },
      } satisfies II18nParameters,
      status: httpStatusCodes.NOT_FOUND,
      option: {
        logging: {
          message: 'i am additional information',
        },
      },
    });
  }

  return pet;
}
