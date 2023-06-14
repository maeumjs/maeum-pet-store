import type {
  IGetCategoryParamsDto,
  IGetCategoryQuerystringDto,
} from '#/dto/v1/category/IGetCategory';
import { read } from '#/repository/category';
import {
  ApiError,
  ApiErrorJsonSchema,
  ApiValidationErrorJsonSchema,
} from '@maeum/error-controller';
import type { I18nParameters } from '@maeum/i18n-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Category'],
    summary: 'Read Category',
    operationId: 'read-category',
    description: 'Read Category using id',
    querystring: { $ref: 'IGetCategoryQuerystringDto' },
    params: { $ref: 'IGetCategoryParamsDto' },
    response: {
      200: { $ref: 'ICategoryDto' },
      400: ApiValidationErrorJsonSchema,
      500: ApiErrorJsonSchema,
    },
  },
};

export default async function handler(
  req: FastifyRequest<{ Querystring: IGetCategoryQuerystringDto; Params: IGetCategoryParamsDto }>,
) {
  const category = await read(req.query, req.params);

  if (category == null) {
    throw new ApiError({
      i18n: {
        phrase: 'pet-store.not-found-category',
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

  return category;
}
