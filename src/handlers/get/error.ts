import { ConfigContainer } from '#/configs/ConfigContainer';
import type { IReplyHealthDto } from '#/dto/common/IReplyHealthDto';
import {
  ApiError,
  ApiErrorJsonSchema,
  ApiValidationErrorJsonSchema,
} from '@maeum/error-controller';
import { I18nController, type II18nParameters } from '@maeum/i18n-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Common'],
    summary: 'Server health check and configuration getting',
    operationId: 'raise-error',
    hide: false,
    querystring: {
      type: 'object',
      properties: {
        ee: {
          type: 'string',
        },
      },
    },
    response: {
      200: { $ref: 'IReplyHealthDto' },
      400: ApiValidationErrorJsonSchema,
      500: ApiErrorJsonSchema,
    },
  },
};

export default async function errorHandler(
  req: FastifyRequest<{ Querystring: { ee?: string; code?: string; pe?: string } }>,
) {
  const language = I18nController.it.getLanguageFromRequestHeader(req.headers['accept-language']);

  if (req.query.ee == null) {
    if (req.query.code != null) {
      throw new ApiError({
        code: req.query.code,
        i18n: { phrase: 'common.main.error' } satisfies II18nParameters,
        payload: { description: 'this is a test payload' },
      });
    }

    if (req.query.pe != null) {
      throw new Error('plain error raised');
    }

    throw new ApiError({
      i18n: { phrase: 'common.main.error' } satisfies II18nParameters,
      payload: { description: 'this is a test payload' },
    });
  }

  return {
    envMode: ConfigContainer.it.config.server.envMode,
    runMode: ConfigContainer.it.config.server.runMode,
    port: ConfigContainer.it.config.server.port,
    i18n: { language },
  } satisfies IReplyHealthDto;
}
