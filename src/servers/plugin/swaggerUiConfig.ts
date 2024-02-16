import type { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

/** swagger ui configuration */
export function swaggerUiConfig(): FastifySwaggerUiOptions {
  return {
    routePrefix: '/swagger.io',

    uiConfig: {
      deepLinking: true,
      filter: true,
    },
  };
}
