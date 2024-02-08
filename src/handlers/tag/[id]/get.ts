import type { IGetTagParamsDto, IGetTagQuerystringDto } from '#/dto/v1/tag/IGetTag';
import { read } from '#/repository/tag';
import {
  ApiError,
  ApiErrorJsonSchema,
  ApiValidationErrorJsonSchema,
} from '@maeum/error-controller';
import type { II18nParameters } from '@maeum/i18n-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Tag'],
    summary: 'Read Tag',
    operationId: 'read-tag',
    description: 'Read Tag using id',
    querystring: { $ref: 'IGetTagQuerystringDto' },
    params: { $ref: 'IGetTagParamsDto' },
    response: {
      200: { $ref: 'ITagDto' },
      400: ApiValidationErrorJsonSchema,
      500: ApiErrorJsonSchema,
    },
  },
};

export async function handler(
  req: FastifyRequest<{ Querystring: IGetTagQuerystringDto; Params: IGetTagParamsDto }>,
) {
  const category = await read(req.query, req.params);

  if (category == null) {
    throw new ApiError({
      i18n: {
        phrase: 'pet-store.not-found-tag',
        option: { id: req.params.id },
      } satisfies II18nParameters,
      status: 404,
      $option: {
        logging: {
          message: 'i am additional information',
        },
      },
    });
  }

  return category;
}
