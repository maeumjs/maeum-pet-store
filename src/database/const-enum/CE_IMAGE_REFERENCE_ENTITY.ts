export const CE_IMAGE_REFERENCE_ENTITY = {
  PET: 0,
  STORE: 1,
} as const;

export type CE_IMAGE_REFERENCE_ENTITY =
  (typeof CE_IMAGE_REFERENCE_ENTITY)[keyof typeof CE_IMAGE_REFERENCE_ENTITY];
