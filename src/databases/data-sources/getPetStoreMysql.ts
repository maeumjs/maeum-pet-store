import { ConfigContainer } from '#/configs/ConfigContainer';
import { CategoryEntity } from '#/databases/entities/CategoryEntity';
import { ImageEntity } from '#/databases/entities/ImageEntity';
import { PetCategoryMTMEntity } from '#/databases/entities/PetCategoryMTMEntity';
import { PetEntity } from '#/databases/entities/PetEntity';
import { PetTagMTMEntity } from '#/databases/entities/PetTagMTMEntity';
import { TagEntity } from '#/databases/entities/TagEntity';
import { TypeORMLogger } from '#/databases/logging/TypeORMLogger';
import { CE_LOG_ID } from '#/modules/logging/const-enum/CE_LOG_ID';
import { WinstonContainer } from '@maeum/logging-controller';
import { randomUUID } from 'crypto';
import { differenceInMilliseconds } from 'date-fns';
import httpStatusCodes from 'http-status-codes';
import { DataSource } from 'typeorm';
import type { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const log = WinstonContainer.l(__filename);

export function getPetStoreMysql() {
  const start = new Date();
  const username = process.env.DB_PET_STORE_USERNAME;
  const password = process.env.DB_PET_STORE_PASSWORD;
  const mysql = ConfigContainer.it.config.mysql['pet-store'];

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

  log.info({
    id: CE_LOG_ID.DB_CONNECTION,
    status: httpStatusCodes.OK,
    duration: differenceInMilliseconds(end, start),
    tid: randomUUID(),
    body: {
      ...option,
    },
  });

  log.$(
    `database connection complete: ${option.username}@${option.host}:${option.port}/${option.database}`,
  );

  return ds;
}
