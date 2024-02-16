export const CE_SERVER_DEFAULT_VALUE = {
  TRACKING_ID_AC: 'tracking-id-in-async-context',
} as const;

/* eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare */
export type CE_SERVER_DEFAULT_VALUE =
  (typeof CE_SERVER_DEFAULT_VALUE)[keyof typeof CE_SERVER_DEFAULT_VALUE];
