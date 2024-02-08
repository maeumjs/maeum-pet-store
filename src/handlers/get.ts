import { handler as healthHandler, option as healthOption } from '#/handlers/health/get';
import type { FastifyInstance, FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: (fastify: FastifyInstance) => RouteShorthandOptions = (_fastify) => {
  return {
    ...healthOption,
    schema: {
      ...healthOption.schema,
      operationId: 'get-root-server-health',
      hide: true,
    },
  };
};

export async function handler(req: FastifyRequest) {
  return healthHandler(req);
}
