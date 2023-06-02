import { CE_MYSQL_DATABASE_NAMES } from '#configs/const-enum/CE_MYSQL_DATABASE_NAMES';
import logging from '#loggers/bootstrap';
import getCmsDataSource from '#storages/mysql/data-sources/getCMSDstaSource';
import type { ReadonlyDeep } from 'type-fest';
import { DataSource } from 'typeorm';

const log = logging(__filename);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const internalMySql: { [CE_MYSQL_DATABASE_NAMES.CMS_API]: DataSource } = {} as any;
const mysql: ReadonlyDeep<{ [CE_MYSQL_DATABASE_NAMES.CMS_API]: DataSource }> = internalMySql;

export async function bootstrap() {
  log.trace('mysql database initialize');

  const cmsDataSource: DataSource = getCmsDataSource();
  await cmsDataSource.initialize();

  internalMySql[CE_MYSQL_DATABASE_NAMES.CMS_API] = cmsDataSource;
}

export async function unbootstrap() {
  await internalMySql[CE_MYSQL_DATABASE_NAMES.CMS_API].destroy();
}

export default mysql;
