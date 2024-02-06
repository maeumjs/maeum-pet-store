import '@fastify/request-context';

declare namespace NodeJS {
  // eslint-disable-next-line
  interface ProcessEnv {
    /** RUN_MODE field decide server configuration kind */
    RUN_MODE?: string;

    /** ENV_LOG_LEVEL field decide winston log level */
    ENV_APP_LOG_LEVEL?: string;

    /** ENV_DB_LOG_LEVEL field decide TypeORM log level */
    ENV_DB_LOG_LEVEL?: string;

    /** ENV_REPLY_LOGGING field decide reply payload logging or not */
    ENV_PAYLOAD_LOGGING?: 'true' | 'false';

    /** ENV_REPLY_COMPRESS field decide logged reply payload compress or not */
    ENV_PAYLOAD_LOG_COMPRESS?: 'true' | 'false';
  }
}

declare module '@fastify/request-context' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface RequestContextData {
    tid: string;
  }
}
