import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import type { FastifyDynamicSwaggerOptions, JSONObject } from '@fastify/swagger';

function getReferenceId(json: JSONObject, index: number): string {
  try {
    if (typeof json.$id === 'string') {
      const referenceId = json.$id.replace('#/', '').replace(/\//g, '-');
      return referenceId;
    }

    return `def-${index}`;
  } catch {
    return `def-${index}`;
  }
}

/** swagger configuration */
export function swaggerConfig(): FastifyDynamicSwaggerOptions {
  const packageJson = container.resolve(CE_DI.PACKAGE_JSON);

  return {
    openapi: {
      info: {
        title: packageJson.name ?? '',
        description: packageJson.description ?? '',
        version: packageJson.version ?? '1.0.0',
      },
    },
    refResolver: {
      buildLocalReference(json, _baseUri, _fragment, i) {
        if (json.title == null && json.$id != null) {
          // eslint-disable-next-line no-param-reassign
          json.title = json.$id;
        }

        return getReferenceId(json, i);
      },
    },
  };
}
