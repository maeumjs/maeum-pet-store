import config from '#configs/config';
import logging from '#loggers/bootstrap';
import { CE_TYPEORM_LOG_COMMENT } from '#storages/mysql/loggers/CE_DATABASE_DEFAULT';
import TTypeORMLogLevel from '#storages/mysql/loggers/TTypeORMLogLevel';
import getQueryAndParameters from '#storages/mysql/loggers/modules/getQueryAndParameters';
import escape from '#tools/misc/escape';
import escapeSafeStringify from '#tools/misc/escapeSafeStringify';
import httpStatusCodes from 'http-status-codes';
import { Logger, QueryRunner } from 'typeorm';

const log = logging(__filename);

export default class TypeORMCustomLogger implements Logger {
  public static getLogLevel(level?: string): TTypeORMLogLevel {
    if (level === 'info' || level === 'log' || level === 'warn') {
      return level;
    }
    return 'warn';
  }

  accessor level: TTypeORMLogLevel = TypeORMCustomLogger.getLogLevel(process.env.ENV_DB_LOG_LEVEL);

  constructor() {
    log.trace('TypeORM log-level: ', process.env.ENV_DB_LOG_LEVEL);
  }

  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
    const reqUrl =
      queryRunner?.data.request != null ? `${escapeSafeStringify(queryRunner.data.request)}` : '';

    if (this.level === 'log') {
      const queryAndParameters = getQueryAndParameters(query, parameters);

      if (queryAndParameters.query.indexOf(CE_TYPEORM_LOG_COMMENT.EXCLUDE_FROM_LOG) <= 0) {
        log.trace(`typeorm://query >> `, queryAndParameters.query);

        log.info({
          status: httpStatusCodes.OK,
          req_method: 'SYS',
          req_url: 'typeorm://query/full',
          body: {
            raw: escape(query),
            evaluated: queryAndParameters.query,
            parameters: escapeSafeStringify(queryAndParameters.parameters),
            req_url: reqUrl,
            run_mode: config.server.runMode,
          },
        });
      }
    }
  }

  /**
   * Logs query that is failed.
   */
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: unknown[],
    queryRunner?: QueryRunner,
  ) {
    const reqUrl =
      queryRunner?.data.request != null ? `${escapeSafeStringify(queryRunner.data.request)}` : '';

    if (this.level !== 'warn') {
      const queryAndParameters = getQueryAndParameters(query, parameters);

      if (queryAndParameters.query.indexOf(CE_TYPEORM_LOG_COMMENT.EXCLUDE_FROM_LOG) <= 0) {
        log.trace(`typeorm://query >> `, queryAndParameters.query);

        log.error({
          status: httpStatusCodes.INTERNAL_SERVER_ERROR,
          req_method: 'SYS',
          req_url: 'typeorm://query/error',
          err_msg: typeof error === 'string' ? error : error.message,
          err_stk: typeof error !== 'string' ? error.stack : undefined,
          body: {
            raw: escape(query),
            evaluated: queryAndParameters.query,
            parameters: escapeSafeStringify(queryAndParameters.parameters),
            req_url: reqUrl,
            run_mode: config.server.runMode,
          },
        });
      }
    }
  }

  /**
   * Logs query that is slow.
   */
  // eslint-disable-next-line class-methods-use-this
  logQuerySlow(time: number, query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
    const reqUrl =
      queryRunner?.data.request != null ? `${escapeSafeStringify(queryRunner.data.request)}` : '';

    const queryAndParameters = getQueryAndParameters(query, parameters);

    log.crit({
      status: httpStatusCodes.GATEWAY_TIMEOUT,
      req_method: 'SYS',
      req_url: 'typeorm://query/error',
      duration: time,
      body: {
        raw: escape(query),
        evaluated: queryAndParameters.query,
        parameters: escapeSafeStringify(queryAndParameters.parameters),
        req_url: reqUrl,
        run_mode: config.server.runMode,
      },
    });

    // if you want to send slack or discord, telegram add code like that, ...
    try {
      log.trace('send slack or discord, telegram');
    } catch {
      log.trace('oops! slack send fail, ...');
    }
  }

  /**
   * Logs events from the schema build process.
   */
  // eslint-disable-next-line class-methods-use-this
  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    const reqUrl =
      queryRunner?.data.request != null ? `${escapeSafeStringify(queryRunner.data.request)}` : '';
    log.trace(`${reqUrl} executing query: ${escape(message)}`);
  }

  /**
   * Logs events from the migrations run process.
   */
  // eslint-disable-next-line class-methods-use-this
  logMigration(message: string, queryRunner?: QueryRunner) {
    const reqUrl =
      queryRunner?.data.request != null ? `${escapeSafeStringify(queryRunner.data.request)}` : '';
    log.trace(`${reqUrl} executing query: ${escape(message)}`);
  }

  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log(level: TTypeORMLogLevel, message: unknown) {
    this.level = level;

    log.trace(level, message);

    log.info({
      status: httpStatusCodes.OK,
      req_method: 'SYS',
      req_url: 'typeorm://query/perform_logging',
      body: {
        next_level: level,
        message: escapeSafeStringify(message),
        run_mode: config.server.runMode,
      },
    });
  }
}
