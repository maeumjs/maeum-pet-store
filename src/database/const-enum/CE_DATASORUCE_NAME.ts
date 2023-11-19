export const CE_DATASORUCE_NAME = {
  PET_STORE: 'pet-store',
} as const;

export type CE_DATASORUCE_NAME = (typeof CE_DATASORUCE_NAME)[keyof typeof CE_DATASORUCE_NAME];
