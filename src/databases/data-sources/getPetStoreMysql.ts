import { CategoryEntity } from '#/databases/entities/CategoryEntity';
import { ImageEntity } from '#/databases/entities/ImageEntity';
import { PetCategoryMTMEntity } from '#/databases/entities/PetCategoryMTMEntity';
import { PetEntity } from '#/databases/entities/PetEntity';
import { PetTagMTMEntity } from '#/databases/entities/PetTagMTMEntity';
import { TagEntity } from '#/databases/entities/TagEntity';
import { TypeORMLogger } from '#/databases/logging/TypeORMLogger';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { CE_LOG_ID } from '#/modules/loggings/const-enum/CE_LOG_ID';
import { CE_DI as LOGGING_CONTROLLER } from '@maeum/logging-controller';
import { randomUUID } from 'crypto';
import { differenceInMilliseconds } from 'date-fns';
import httpStatusCodes from 'http-status-codes';
import { DataSource } from 'typeorm';
import type { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions.js';

const log = container.resolve(LOGGING_CONTROLLER.WINSTON_LOGGERS).l(import.meta.filename);

export function getPetStoreMysql() {
  const config = container.resolve(CE_DI.CONFIG);
  const start = new Date();
  const username = process.env.DB_PET_STORE_USERNAME;
  const password = process.env.DB_PET_STORE_PASSWORD;
  const mysql = config.mysql['pet-store'];

  if (username == null || password == null) {
    throw new Error(`Please specify database username, password: ${username}, ${password}`);
  }

  const option: MysqlConnectionOptions = {
    ...mysql,
    type: 'mysql',
    username,
    password,
    bigNumberStrings: true,
    supportBigNumbers: true,
    synchronize: false,
    logger: new TypeORMLogger('all'),
    entities: [
      CategoryEntity,
      TagEntity,
      PetEntity,
      PetCategoryMTMEntity,
      PetTagMTMEntity,
      ImageEntity,
    ],
  };

  const ds = new DataSource(option);
  const end = new Date();

  const d = differenceInMilliseconds(end, start);
  const t = randomUUID();
  log.info({
    id: CE_LOG_ID.DB_CONNECTION,
    status: httpStatusCodes.OK,
    duration: d,
    tid: t,
    body: {
      ...option,
    },
  });

  log.$(
    `database connection complete: ${option.username}@${option.host}:${option.port}/${option.database}`,
  );

  return ds;
}
