export const CE_DATABASE_DEFAULT = {
  USER_ID_LENGTH: 512,
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/naming-convention
export type CE_DATABASE_DEFAULT = (typeof CE_DATABASE_DEFAULT)[keyof typeof CE_DATABASE_DEFAULT];
