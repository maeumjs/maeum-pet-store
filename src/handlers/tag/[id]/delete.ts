import { del } from '#/databases/repository/tag';
import type { IDeleteTagParamsDto, IDeleteTagQuerystringDto } from '#/dto/v1/tag/IDeleteTag';
import { ApiErrorJsonSchema, ApiValidationErrorJsonSchema } from '@maeum/error-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Tag'],
    summary: 'Delete Tag',
    operationId: 'delete-tag-by-id',
    description: 'Delete Tag using id',
    querystring: { $ref: 'IDeleteTagQuerystringDto' },
    params: { $ref: 'IDeleteTagParamsDto' },
    response: {
      200: { $ref: 'ITagDto' },
      400: ApiValidationErrorJsonSchema,
      500: ApiErrorJsonSchema,
    },
  },
};

export async function handler(
  req: FastifyRequest<{
    Querystring: IDeleteTagQuerystringDto;
    Params: IDeleteTagParamsDto;
  }>,
) {
  const category = await del(req.query, req.params);
  return category;
}
