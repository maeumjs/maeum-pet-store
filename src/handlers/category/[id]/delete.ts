import { deleteById as deleteCategoryById } from '#/databases/repository/v1/categories/deleteById';
import { selectByIdOrThrow as selectCategoryByIdOrThrow } from '#/databases/repository/v1/categories/selectByIdOrThrow';
import type { ICategoryDto } from '#/dto/v1/category/ICategoryDto';
import type {
  IDeleteCategoryParamsDto,
  IDeleteCategoryQuerystringDto,
} from '#/dto/v1/category/IDeleteCategory';
import { fromEntity as transformCategoryfromEntity } from '#/transforms/v1/categories/fromEntity';
import { ApiErrorJsonSchema, ApiValidationErrorJsonSchema } from '@maeum/error-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Category'],
    summary: 'Delete Category',
    operationId: 'delete-category-by-id',
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
): Promise<ICategoryDto> {
  const category = await selectCategoryByIdOrThrow(req.params);
  await deleteCategoryById(req.params);
  return transformCategoryfromEntity(category);
}
