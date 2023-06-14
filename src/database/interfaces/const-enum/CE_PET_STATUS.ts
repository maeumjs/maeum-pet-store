/**
 * pet status
 */
export const CE_PET_STATUS = {
  /** pet available */
  AVAILABLE: 'available',

  /** pet pending */
  PENDING: 'pending',

  /** pet sold */
  SOLD: 'sold',
} as const;

export type CE_PET_STATUS = (typeof CE_PET_STATUS)[keyof typeof CE_PET_STATUS];
