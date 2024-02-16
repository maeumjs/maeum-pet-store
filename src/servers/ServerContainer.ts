import { ConfigContainer } from '#/configs/ConfigContainer';
import route from '#/handlers/route';
import { CE_SERVER_DEFAULT_VALUE } from '#/servers/const-enum/CE_SERVER_DEFAULT_VALUE';
import { fastifyOptionFactory } from '#/servers/fastifyOptionFactory';
import { swaggerConfig } from '#/servers/plugin/swaggerConfig';
import { swaggerUiConfig } from '#/servers/plugin/swaggerUiConfig';
import fastifyCors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import { fastifyRequestContext } from '@fastify/request-context';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyUrlData from '@fastify/url-data';
import { ErrorController } from '@maeum/error-controller';
import { RequestLogger, WinstonContainer } from '@maeum/logging-controller';
import { AsyncResource, executionAsyncId } from 'async_hooks';
import type { FastifyInstance } from 'fastify';
import { writeFileSync } from 'fs';

export class ServerContainer {
  static #it: ServerContainer;

  static get it(): Readonly<ServerContainer> {
    return this.#it;
  }

  static #isBootstrap: boolean = false;

  static get isBootstrap(): Readonly<boolean> {
    return this.#isBootstrap;
  }

  static async bootstrap() {
    const { fastify } = fastifyOptionFactory();

    await fastify
      .register(fastifyUrlData)
      .register(fastifyCors)
      .register(fastifyRequestContext, {
        defaultStoreValues: (req) => ({
          tid: req.id,
          lang: req.headers['accept-language'],
          type: CE_SERVER_DEFAULT_VALUE.TRACKING_ID_AC,
          triggerAsyncId: executionAsyncId(),
        }),
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
    if (ConfigContainer.it.config.server.runMode !== 'production') {
      await fastify.register(fastifySwagger, swaggerConfig());
      await fastify.register(fastifySwaggerUI, swaggerUiConfig());
    }

    await fastify.register(RequestLogger.it.plugin, RequestLogger.it);
    fastify.setErrorHandler(ErrorController.fastifyHandler);

    route(fastify);

    ServerContainer.#it = new ServerContainer(fastify);
    ServerContainer.#isBootstrap = true;

    return ServerContainer.#it;
  }

  #fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.#fastify = fastify;
  }

  get fastify() {
    return this.#fastify;
  }

  listen() {
    const port = ConfigContainer.it.getPort();
    const log = WinstonContainer.l(__filename);

    this.#fastify.listen({ port, host: '0.0.0.0' }, (err, address) => {
      const sj = this.#fastify.swagger();

      writeFileSync('swagger.json', JSON.stringify(sj, undefined, 2));

      if (err != null) {
        log.crit({
          err,
          body: { port, run_mode: ConfigContainer.it.config.server.runMode, address },
        });

        throw err;
      }

      log.info({
        body: { port, run_mode: ConfigContainer.it.config.server.runMode, address },
      });

      log.$(`Server start: [${port}:] localhost:${port}-${process.pid}/start`);

      // for pm2
      if (process.send != null) {
        process.send('ready');
      }
    });
  }
}
