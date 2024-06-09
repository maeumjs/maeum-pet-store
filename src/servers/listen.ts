import { getPort } from '#/configs/modules/getPort';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { CE_DI as LOGGING_CONTROLLER, type WinstonLoggers } from '@maeum/logging-controller';
import { writeFileSync } from 'fs';

export function listen() {
  const config = container.resolve(CE_DI.CONFIG);
  const server = container.resolve(CE_DI.SERVER);
  const port = getPort();
  const winston = container.resolve<WinstonLoggers>(LOGGING_CONTROLLER.WINSTON_LOGGERS);
  const log = winston.l(import.meta.filename);

  server.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (process.env.ENV_CREATE_SWAGGER_DOC_FILE === 'true') {
      const sj = server.swagger();
      writeFileSync('swagger.json', JSON.stringify(sj, undefined, 2));
    }

    if (err != null) {
      log.crit({
        err,
        body: { port, run_mode: config.server.runMode, address },
      });

      throw err;
    }

    log.info({
      body: { port, run_mode: config.server.runMode, address },
    });

    log.$(`Server start: [${port}:] localhost:${port}-${process.pid}/start`);

    // for pm2
    if (process.send != null) {
      process.send('ready');
    }
  });
}
