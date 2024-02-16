import { SchemaController } from '@maeum/schema-controller';
import { getGenReqIdHandler } from '@maeum/tools';
import type { FastifyServerOptions } from 'fastify';
import fastify from 'fastify';
import type { IncomingMessage, Server, ServerResponse } from 'http';
import { createServer } from 'http';

type THttpServerFactory = (
  handler: (req: IncomingMessage, res: ServerResponse) => void,
  _option: FastifyServerOptions,
) => Server;

/**
 * HTTP serverFactory
 */
function httpServerFactory(handler: (req: IncomingMessage, res: ServerResponse) => void): Server {
  const newServer = createServer((req, res) => handler(req, res));
  newServer.keepAliveTimeout = 120 * 100;
  return newServer;
}

export function fastifyOptionFactory() {
  const option: FastifyServerOptions & { serverFactory: THttpServerFactory } = {
    ignoreTrailingSlash: true,
    serverFactory: httpServerFactory,
    genReqId: getGenReqIdHandler('tid'),
  };

  const server = fastify<Server, IncomingMessage, ServerResponse>(option);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  server.setSchemaController(SchemaController.it.getFastifyController(server as any) as any);

  return { fastify: server, option };
}
