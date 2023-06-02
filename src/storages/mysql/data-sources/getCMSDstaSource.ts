import config from '#configs/config';
import { CE_MYSQL_DATABASE_NAMES } from '#configs/const-enum/CE_MYSQL_DATABASE_NAMES';
import ArticleEntity from '#entities/v1/article/ArticleEntity';
import TypeORMCustomLogger from '#storages/mysql/loggers/TypeORMCustomLogger';
import getMaxQueryExecutionTime from '#storages/mysql/modules/driver/getMaxQueryExecutionTime';
import fastCopy from 'fast-copy';
import { DataSource } from 'typeorm';
import type { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const cmsDbOption: MysqlConnectionOptions = {
  type: 'mysql',
  logger: new TypeORMCustomLogger(),
  timezone: 'Z',
  connectorPackage: 'mysql2',
  maxQueryExecutionTime: getMaxQueryExecutionTime(process.env.ENV_APP_LOG_LEVEL),
  // support bigint
  supportBigNumbers: true,
  // support bigint value convert to string
  bigNumberStrings: true,
  entities: [ArticleEntity],
};

function getCmsDataSource() {
  const replication = fastCopy(
    config.mysql[CE_MYSQL_DATABASE_NAMES.CMS_API].replication,
  ) as NonNullable<MysqlConnectionOptions['replication']>;

  const options: MysqlConnectionOptions = {
    ...cmsDbOption,
    replication: {
      ...replication,
      master: {
        ...replication.master,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
      },
      slaves: replication.slaves.map((slave) => {
        return {
          ...slave,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
        };
      }),
    },
    poolSize: config.mysql[CE_MYSQL_DATABASE_NAMES.CMS_API].poolSize,
  };

  return new DataSource(options);
}

export default getCmsDataSource;
