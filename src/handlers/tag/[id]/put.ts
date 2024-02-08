import type { IPutTagBodyDto, IPutTagParamsDto, IPutTagQuerystringDto } from '#/dto/v1/tag/IPutTag';
import { update } from '#/repository/tag';
import { ApiErrorJsonSchema, ApiValidationErrorJsonSchema } from '@maeum/error-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Tag'],
    summary: 'Put Tag',
    operationId: 'put-tag',
    description: 'Put Tag',
    querystring: { $ref: 'IPutTagQuerystringDto' },
    params: { $ref: 'IPutTagParamsDto' },
    body: { $ref: 'IPutTagBodyDto' },
    response: {
      200: { $ref: 'ITagDto' },
      400: ApiValidationErrorJsonSchema,
      500: ApiErrorJsonSchema,
    },
  },
};

export async function handler(
  req: FastifyRequest<{
    Querystring: IPutTagQuerystringDto;
    Params: IPutTagParamsDto;
    Body: IPutTagBodyDto;
  }>,
) {
  const category = await update(req.query, req.params, req.body);
  return category;
}
