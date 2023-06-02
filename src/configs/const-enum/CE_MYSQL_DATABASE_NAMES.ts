export const CE_MYSQL_DATABASE_NAMES = {
  CMS_API: 'cmsApi',
} as const;

/* eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare */
export type CE_MYSQL_DATABASE_NAMES =
  (typeof CE_MYSQL_DATABASE_NAMES)[keyof typeof CE_MYSQL_DATABASE_NAMES];
