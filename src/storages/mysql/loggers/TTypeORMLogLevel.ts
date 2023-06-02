import type { Logger } from 'typeorm';

/**
 * Log level of database(via TypeORM)
 *
 * - log: logging every query in TypeORM
 * - info: logging error query and slow query
 * - warn: logging only slow query
 */
type TTypeORMLogLevel = Parameters<Logger['log']>[0];

export default TTypeORMLogLevel;
