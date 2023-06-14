import type { TEndpoint } from '#/configs/interfaces/IEndpoint';
import type { IServer } from '#/configs/interfaces/IServer';
import type { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

/** 서버 설정 */
export interface IConfiguration {
  server: IServer;
  endpoint: TEndpoint;
  mysql: Pick<Omit<MysqlConnectionOptions, 'cache'>, 'host' | 'port' | 'database' | 'replication'>;
}
