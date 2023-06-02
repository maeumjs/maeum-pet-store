export const CE_TYPEORM_LOG_COMMENT = {
  EXCLUDE_FROM_LOG: '$$TYPEORM_QUERY_LOG_EXCLUDE$$',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/naming-convention
export type CE_TYPEORM_LOG_COMMENT =
  (typeof CE_TYPEORM_LOG_COMMENT)[keyof typeof CE_TYPEORM_LOG_COMMENT];
