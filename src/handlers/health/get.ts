import type { IReplyHealthDto } from '#/dto/common/IReplyHealthDto';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { getAsyncStoreOrThrow } from '#/modules/loggings/stores/getAsyncStoreOrThrow';
import { ApiErrorJsonSchema } from '@maeum/error-controller';
import { CE_DI as I18N_CONTROLLER } from '@maeum/i18n-controller';
import { CE_DI as LOGGING_CONTROLLER } from '@maeum/logging-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

const log = container.resolve(LOGGING_CONTROLLER.MAEUM_LOGGERS).l(__filename);

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Common'],
    summary: 'Server health check and configuration getting',
    operationId: 'get-server-health',
    response: {
      200: { $ref: 'IReplyHealthDto' },
      400: ApiErrorJsonSchema,
      500: ApiErrorJsonSchema,
    },
  },
};

export async function handler(_req: FastifyRequest) {
  const config = container.resolve(CE_DI.CONFIG);
  const i18n = container.resolve(I18N_CONTROLLER.I18N_CONTROLLER);
  const store = getAsyncStoreOrThrow();
  const language = i18n.getLanguageFromRequestHeader(store.lang);

  log.$('request id: ', store.tid);

  return {
    envMode: config.server.envMode,
    runMode: config.server.runMode,
    port: config.server.port,
    i18n: { language },
  } satisfies IReplyHealthDto;
}
