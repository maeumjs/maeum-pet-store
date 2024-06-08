import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';

export function getPort(): number {
  const config = container.resolve(CE_DI.CONFIG);
  const envPort = process.env.PORT ?? '';
  const parsed = parseInt(envPort, 10);

  if (!Number.isNaN(parsed) && config.server.port !== parsed) {
    config.server.port = parsed;
    return parsed;
  }

  return config.server.port;
}
