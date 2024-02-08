import type {
  IDeleteCategoryParamsDto,
  IDeleteCategoryQuerystringDto,
} from '#/dto/v1/category/IDeleteCategory';
import { del } from '#/repository/category';
import { ApiErrorJsonSchema, ApiValidationErrorJsonSchema } from '@maeum/error-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Category'],
    summary: 'Delete Category',
    operationId: 'delete-category',
    description: 'Delete Category using id',
    querystring: { $ref: 'IGetCategoryQuerystringDto' },
    params: { $ref: 'IGetCategoryParamsDto' },
    response: {
      200: { $ref: 'ICategoryDto' },
      400: ApiValidationErrorJsonSchema,
      500: ApiErrorJsonSchema,
    },
  },
};

export async function handler(
  req: FastifyRequest<{
    Querystring: IDeleteCategoryQuerystringDto;
    Params: IDeleteCategoryParamsDto;
  }>,
) {
  const category = await del(req.query, req.params);
  return category;
}
