import type { IPostTagBodyDto, IPostTagQuerystringDto } from '#/dto/v1/tag/IPostTag';
import { create } from '#/repository/tag';
import { ApiErrorJsonSchema, ApiValidationErrorJsonSchema } from '@maeum/error-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Tag'],
    summary: 'Create Tag',
    operationId: 'create-tag',
    description: 'Create Tag',
    querystring: { $ref: 'IPostTagQuerystringDto' },
    body: { $ref: 'IPostTagBodyDto' },
    response: {
      200: { $ref: 'ITagDto' },
      400: ApiValidationErrorJsonSchema,
      500: ApiErrorJsonSchema,
    },
  },
};

export async function handler(
  req: FastifyRequest<{ Querystring: IPostTagQuerystringDto; Body: IPostTagBodyDto }>,
) {
  const tag = await create({ name: req.body.name });
  return tag;
}
