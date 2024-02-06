/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import type { TidAsyncResource } from '#/cron/TidAsyncResource';
import { AsyncContainer } from '@maeum/async-context';
import { WinstonContainer } from '@maeum/logging-controller';
import { executionAsyncId } from 'async_hooks';
import type { Logger, QueryRunner } from 'typeorm';

const log = WinstonContainer.l(__filename);

export class TypeORMLogger implements Logger {
  // implement all methods from logger class
  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, _parameters?: any[], _queryRunner?: QueryRunner): any {
    const store = AsyncContainer.it.getStore<TidAsyncResource>(executionAsyncId());
    log.$('typeorm TID: ', store?.tid);
    return true;
  }

  /**
   * Logs query that is failed.
   */
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {
    log.$(query);
    return true;
  }

  /**
   * Logs query that is slow.
   */
  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    log.$(time, query);
    return true;
  }

  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    log.$(message);
    return true;
  }

  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string, queryRunner?: QueryRunner): any {
    log.$(message);
    return true;
  }

  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner): any {
    log.$(message);
    return true;
  }
}
