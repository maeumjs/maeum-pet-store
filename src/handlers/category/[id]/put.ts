import type {
  IPutCategoryBodyDto,
  IPutCategoryParamsDto,
  IPutCategoryQuerystringDto,
} from '#/dto/v1/category/IPutCategory';
import { update } from '#/repository/category';
import { ApiErrorJsonSchema, ApiValidationErrorJsonSchema } from '@maeum/error-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Category'],
    summary: 'Put Category',
    operationId: 'put-category',
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
  const category = await update(req.query, req.params, req.body);
  return category;
}
