import { ConfigContainer } from '#/configs/ConfigContainer';
import { CategoryEntity } from '#/database/entities/CategoryEntity';
import { ImageEntity } from '#/database/entities/ImageEntity';
import { PetCategoryMTMEntity } from '#/database/entities/PetCategoryMTMEntity';
import { PetEntity } from '#/database/entities/PetEntity';
import { PetTagMTMEntity } from '#/database/entities/PetTagMTMEntity';
import { TagEntity } from '#/database/entities/TagEntity';
import { WinstonContainer } from '@maeum/logging-controller';
import { DataSource } from 'typeorm';
import type { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const log = WinstonContainer.l(__filename);

export function getPetStoreMysql() {
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
    synchronize: true,
    // logger: new TypeORMLogger(),
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

  log.$(
    `database connection complete: ${option.username}@${option.host}:${option.port}/${option.database}`,
  );

  return ds;
}
