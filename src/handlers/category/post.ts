import { insert as insertCategory } from '#/databases/repository/v1/categories/insert';
import { selectByIdOrThrow as selectCategoryByIdOrThrow } from '#/databases/repository/v1/categories/selectByIdOrThrow';
import type {
  IPostCategoryBodyDto,
  IPostCategoryQuerystringDto,
} from '#/dto/v1/category/IPostCategory';
import { fromEntity as transformCategoryFromEntity } from '#/transforms/v1/categories/fromEntity';
import { ApiErrorJsonSchema, ApiValidationErrorJsonSchema } from '@maeum/error-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Category'],
    summary: 'Create Category',
    operationId: 'create-category',
    description: 'Create Category',
    querystring: { $ref: 'IPostCategoryQuerystringDto' },
    body: { $ref: 'IPostCategoryBodyDto' },
    response: {
      200: { $ref: 'ICategoryDto' },
      400: ApiValidationErrorJsonSchema,
      500: ApiErrorJsonSchema,
    },
  },
};

export async function handler(
  req: FastifyRequest<{
    Querystring: IPostCategoryQuerystringDto;
    Body: IPostCategoryBodyDto;
  }>,
) {
  const result = await insertCategory({ values: req.body });
  const category = await selectCategoryByIdOrThrow({ id: result.id }, { master: true });

  return transformCategoryFromEntity(category);
}
