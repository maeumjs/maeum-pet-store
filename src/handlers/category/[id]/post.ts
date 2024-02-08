import type {
  IPostCategoryBodyDto,
  IPostCategoryQuerystringDto,
} from '#/dto/v1/category/IPostCategory';
import { create } from '#/repository/category';
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
  req: FastifyRequest<{ Querystring: IPostCategoryQuerystringDto; Body: IPostCategoryBodyDto }>,
) {
  const category = await create({ name: req.body.name });
  return category;
}
