import route from '#/handlers/route';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { CE_SERVER_DEFAULT_VALUE } from '#/servers/const-enum/CE_SERVER_DEFAULT_VALUE';
import { fastifyOptionFactory } from '#/servers/fastifyOptionFactory';
import type { IAsyncStore } from '#/servers/interfaces/IAsyncStore';
import { swaggerConfig } from '#/servers/plugin/swaggerConfig';
import { swaggerUiConfig } from '#/servers/plugin/swaggerUiConfig';
import fastifyCors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import { fastifyRequestContext } from '@fastify/request-context';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyUrlData from '@fastify/url-data';
import { getFastifyHandler } from '@maeum/error-controller';
import { CE_DI as LOGGING_CONTROLLER, type RequestLogger } from '@maeum/logging-controller';
import { AsyncResource, executionAsyncId } from 'node:async_hooks';

export async function makeServer() {
  const config = container.resolve(CE_DI.CONFIG);
  const { fastify } = fastifyOptionFactory();

  await fastify
    .register(fastifyUrlData)
    .register(fastifyCors)
    .register(fastifyRequestContext, {
      defaultStoreValues: (req) => {
        const store: IAsyncStore = {
          tid: req.id as IAsyncStore['tid'],
          lang: req.headers['accept-language'],
          type: CE_SERVER_DEFAULT_VALUE.TRACKING_ID_AC,
          triggerAsyncId: executionAsyncId(),
        };
        return store;
      },
      createAsyncResource: () => new AsyncResource(CE_SERVER_DEFAULT_VALUE.TRACKING_ID_AC),
    })
    .register(fastifyMultipart, {
      attachFieldsToBody: true,
      throwFileSizeLimit: true,
      limits: {
        fileSize: 1 * 1024 * 1024 * 1024, // 1mb limits
        files: 2,
      },
      sharedSchemaId: 'fileUploadSchema',
    });

  // If server start production mode, disable swagger-ui
  if (config.server.runMode !== 'production') {
    await fastify.register(fastifySwagger, swaggerConfig());
    await fastify.register(fastifySwaggerUI, swaggerUiConfig());
  }

  const requestLogger = container.resolve<RequestLogger>(LOGGING_CONTROLLER.REQUEST_LOGGER);
  await fastify.register(requestLogger.plugin, requestLogger);
  fastify.setErrorHandler(getFastifyHandler(container));

  route(fastify);

  container.register(CE_DI.SERVER, fastify);

  return fastify;
}
