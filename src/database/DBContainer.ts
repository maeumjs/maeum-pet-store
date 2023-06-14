import { ConfigContainer } from '#/configs/ConfigContainer';
import { CategoryEntity } from '#/database/entities/CategoryEntity';
import { PetCategoryMTMEntity } from '#/database/entities/PetCategoryMTMEntity';
import { PetTagMTMEntity } from '#/database/entities/PetTagMTMEntity';
import { TagEntity } from '#/database/entities/TagEntity';
import { WinstonContainer } from '@maeum/logging-controller';
import { DataSource } from 'typeorm';
import type { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { PetEntity } from './entities/PetEntity';

const log = WinstonContainer.l(__filename);

export class DBContainer {
  static #it: DBContainer;

  static get it(): Readonly<DBContainer> {
    return this.#it;
  }

  static #isBootstrap: boolean = false;

  static get isBootstrap(): Readonly<boolean> {
    return this.#isBootstrap;
  }

  static async bootstrap() {
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;

    if (username == null || password == null) {
      throw new Error(`Please specify database username, password: ${username}, ${password}`);
    }

    const { mysql } = ConfigContainer.it.config;
    const option: MysqlConnectionOptions = {
      ...mysql,
      type: 'mysql',
      username,
      password,
      synchronize: true,
      entities: [CategoryEntity, TagEntity, PetEntity, PetCategoryMTMEntity, PetTagMTMEntity],
    };
    const ds = new DataSource(option);
    await ds.initialize();

    log.$(
      `database connection complete: ${option.username}@${option.host}:${option.port}/${option.database}`,
    );

    DBContainer.#it = new DBContainer(ds);
    DBContainer.#isBootstrap = true;
  }

  #ds: DataSource;

  constructor(ds: DataSource) {
    this.#ds = ds;
  }

  get ds(): Readonly<DataSource> {
    return this.#ds;
  }
}
