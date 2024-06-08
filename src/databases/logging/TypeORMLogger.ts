/* eslint-disable class-methods-use-this */

import { getEvaluateQuery } from '#/databases/logging/getEvaluateQuery';
import { container } from '#/modules/di/container';
import { CE_LOG_ID } from '#/modules/logging/const-enum/CE_LOG_ID';
import { getAsyncTid } from '#/modules/logging/store/getAsyncTid';
import { CE_DI as LOGGING_CONTROLLER } from '@maeum/logging-controller';
import httpStatusCodes from 'http-status-codes';
import { isError, isFalse } from 'my-easy-fp';
import { AbstractLogger, type LogLevel, type LogMessage, type QueryRunner } from 'typeorm';

const log = container.resolve(LOGGING_CONTROLLER.WINSTON_LOGGERS).l(__filename);

export class TypeORMLogger extends AbstractLogger {
  protected writeLog(
    _level: LogLevel,
    _message: string | number | LogMessage | (string | number | LogMessage)[],
    _queryRunner?: QueryRunner | undefined,
  ): void {}

  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: unknown[], _queryRunner?: QueryRunner): void {
    if (isFalse(this.isLogEnabledFor('query'))) {
      return;
    }

    const evaluated = getEvaluateQuery(query, parameters);

    log.info({
      id: CE_LOG_ID.DB_QUERY,
      status: httpStatusCodes.OK,
      body: {
        event: 'query',
        evaluated,
        query: {
          query,
          parameters: evaluated.parameters,
        },
      },
    });
  }

  /**
   * Logs query that is failed.
   */
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: unknown[],
    _queryRunner?: QueryRunner,
  ): void {
    if (isFalse(this.isLogEnabledFor('query-error'))) {
      return;
    }

    const evaluated = getEvaluateQuery(query, parameters);
    const err = isError(
      error,
      new Error(typeof error === 'string' ? error : 'database query error'),
    );

    log.info({
      id: CE_LOG_ID.DB_QUERY,
      status: httpStatusCodes.INTERNAL_SERVER_ERROR,
      err,
      body: {
        event: 'query-error',
        evaluated,
        query: {
          query,
          parameters: evaluated.parameters,
        },
      },
    });
  }

  /**
   * Logs query that is slow.
   */
  logQuerySlow(time: number, query: string, parameters?: unknown[], _queryRunner?: QueryRunner) {
    if (isFalse(this.isLogEnabledFor('query-slow'))) {
      return;
    }

    const evaluated = getEvaluateQuery(query, parameters);

    log.info({
      id: CE_LOG_ID.DB_QUERY,
      status: httpStatusCodes.OK,
      duration: time,
      tid: getAsyncTid(),
      body: {
        event: 'query-slow',
        evaluated,
        query: {
          query,
          parameters: evaluated.parameters,
        },
      },
    });
  }

  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string, _queryRunner?: QueryRunner): void {
    if (isFalse(this.isLogEnabledFor('schema-build')) || isFalse(this.isLogEnabledFor('schema'))) {
      return;
    }

    log.info({
      id: CE_LOG_ID.DB_QUERY,
      status: httpStatusCodes.OK,
      body: {
        event: 'schema-build',
        query: { query: message },
      },
    });
  }

  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string, _queryRunner?: QueryRunner): void {
    if (isFalse(this.isLogEnabledFor('migration'))) {
      return;
    }

    log.info({
      id: CE_LOG_ID.DB_QUERY,
      status: httpStatusCodes.OK,
      body: {
        event: 'migration',
        query: { query: message },
      },
    });
  }
}
