import { del } from '#/databases/repository/tag';
import type { IDeleteTagParamsDto, IDeleteTagQuerystringDto } from '#/dto/v1/tag/IDeleteTag';
import { ApiErrorJsonSchema, ApiValidationErrorJsonSchema } from '@maeum/error-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';
import httpStatusCodes from 'http-status-codes';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Tag'],
    summary: 'Delete Tag',
    operationId: 'delete-tag-by-id',
    description: 'Delete Tag using id',
    querystring: { $ref: 'IDeleteTagQuerystringDto' },
    params: { $ref: 'IDeleteTagParamsDto' },
    response: {
      [httpStatusCodes.OK]: { $ref: 'ITagDto' },
      [httpStatusCodes.BAD_REQUEST]: ApiValidationErrorJsonSchema,
      [httpStatusCodes.INTERNAL_SERVER_ERROR]: ApiErrorJsonSchema,
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
