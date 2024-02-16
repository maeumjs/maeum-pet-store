import { selectByIdOrThrow as selectCategoryByIdOrThrow } from '#/databases/repository/v1/categories/selectByIdOrThrow';
import { updateById as updateCategoryById } from '#/databases/repository/v1/categories/updateById';
import type {
  IPutCategoryBodyDto,
  IPutCategoryParamsDto,
  IPutCategoryQuerystringDto,
} from '#/dto/v1/category/IPutCategory';
import { fromEntity as transformCategoryFromEntity } from '#/transforms/v1/categories/fromEntity';
import { ApiErrorJsonSchema, ApiValidationErrorJsonSchema } from '@maeum/error-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Category'],
    summary: 'Put Category',
    operationId: 'put-category-by-id',
    description: 'Put Category',
    querystring: { $ref: 'IPutCategoryQuerystringDto' },
    params: { $ref: 'IPutCategoryParamsDto' },
    body: { $ref: 'IPutCategoryBodyDto' },
    response: {
      200: { $ref: 'ICategoryDto' },
      400: ApiValidationErrorJsonSchema,
      500: ApiErrorJsonSchema,
    },
  },
};

export async function handler(
  req: FastifyRequest<{
    Querystring: IPutCategoryQuerystringDto;
    Params: IPutCategoryParamsDto;
    Body: IPutCategoryBodyDto;
  }>,
) {
  const result = await updateCategoryById({ values: { ...req.params, ...req.body } });
  const category = await selectCategoryByIdOrThrow({ id: result.id });

  return transformCategoryFromEntity(category);
}
