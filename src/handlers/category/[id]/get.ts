import { selectByIdOrThrow as selectCategoryByIdOrThrow } from '#/databases/repository/v1/categories/selectByIdOrThrow';
import type { ICategoryDto } from '#/dto/v1/category/ICategoryDto';
import type {
  IGetCategoryParamsDto,
  IGetCategoryQuerystringDto,
} from '#/dto/v1/category/IGetCategory';
import { fromEntity as transformCategoryFromEntity } from '#/transforms/v1/categories/fromEntity';
import { ApiErrorJsonSchema, ApiValidationErrorJsonSchema } from '@maeum/error-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Category'],
    summary: 'Read Category',
    operationId: 'read-category-by-id',
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

export async function handler(
  req: FastifyRequest<{ Querystring: IGetCategoryQuerystringDto; Params: IGetCategoryParamsDto }>,
): Promise<ICategoryDto> {
  const category = await selectCategoryByIdOrThrow(req.params);
  return transformCategoryFromEntity(category);
}
