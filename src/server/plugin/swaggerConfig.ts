import { PackageJsonLoader } from '#/modules/packages/PackageJsonLoader';
import type { FastifyDynamicSwaggerOptions, JSONObject } from '@fastify/swagger';

function getReferenceId(json: JSONObject, index: number): string {
  try {
    if (typeof json.$id === 'string') {
      return json.$id;
    }

    return `def-${index}`;
  } catch {
    return `def-${index}`;
  }
}

/** swagger configuration */
export function swaggerConfig(): FastifyDynamicSwaggerOptions {
  return {
    openapi: {
      info: {
        title: PackageJsonLoader.it.packages.name ?? '',
        description: PackageJsonLoader.it.packages.description ?? '',
        version: PackageJsonLoader.it.packages.version ?? '1.0.0',
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
