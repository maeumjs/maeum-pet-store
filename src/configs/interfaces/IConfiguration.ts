import { CE_MYSQL_DATABASE_NAMES } from '#configs/const-enum/CE_MYSQL_DATABASE_NAMES';
import TEndpoint from '#configs/interfaces/IEndpoint';
import IServer from '#configs/interfaces/IServer';
import type { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

type TMysqlConnectionOptionsSchema = Pick<MysqlConnectionOptions, 'replication' | 'poolSize'>;

/** 서버 설정 */
export default interface IConfiguration {
  server: IServer;
  endpoint: TEndpoint;
  mysql: { [CE_MYSQL_DATABASE_NAMES.CMS_API]: TMysqlConnectionOptionsSchema };
}
