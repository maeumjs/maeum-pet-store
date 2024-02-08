import { ConfigContainer } from '#/configs/ConfigContainer';
import type { TidAsyncResource } from '#/cron/TidAsyncResource';
import type { IReplyHealthDto } from '#/dto/common/IReplyHealthDto';
import { requestContext } from '@fastify/request-context';
import { AsyncContainer } from '@maeum/async-context';
import { ApiErrorJsonSchema } from '@maeum/error-controller';
import { I18nController } from '@maeum/i18n-controller';
import { WinstonContainer } from '@maeum/logging-controller';
import { executionAsyncId } from 'async_hooks';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

const log = WinstonContainer.l(__filename);

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

export async function handler(req: FastifyRequest) {
  const language = I18nController.it.getLanguageFromRequestHeader(req.headers['accept-language']);
  const tid = requestContext.get('tid');
  const store = AsyncContainer.getStore<TidAsyncResource>(executionAsyncId());

  log.$('request id: ', tid, store?.tid);

  return {
    envMode: ConfigContainer.it.config.server.envMode,
    runMode: ConfigContainer.it.config.server.runMode,
    port: ConfigContainer.it.config.server.port,
    i18n: { language },
  } satisfies IReplyHealthDto;
}
