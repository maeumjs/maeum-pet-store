import type { IReplyHealthDto } from '#/dto/common/IReplyHealthDto';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import {
  ApiError,
  ApiErrorJsonSchema,
  ApiValidationErrorJsonSchema,
} from '@maeum/error-controller';
import { CE_DI as I18N_CONTROLLER, type II18nParameters } from '@maeum/i18n-controller';
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

export async function handler(
  req: FastifyRequest<{ Querystring: { ee?: string; code?: string; pe?: string } }>,
) {
  const config = container.resolve(CE_DI.CONFIG);
  const i18n = container.resolve(I18N_CONTROLLER.I18N_CONTROLLER);
  const language = i18n.getLanguageFromRequestHeader(req.headers['accept-language']);

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
    envMode: config.server.envMode,
    runMode: config.server.runMode,
    port: config.server.port,
    i18n: { language },
  } satisfies IReplyHealthDto;
}
