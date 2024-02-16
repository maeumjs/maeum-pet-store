export const CE_LOG_ID = {
  DB_CONNECTION: 'db-connection',
  DB_QUERY: 'db-query',
  DB_SLOW_QUERY: 'db-slow-query',
} as const;

/* eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare */
export type CE_LOG_ID = (typeof CE_LOG_ID)[keyof typeof CE_LOG_ID];
