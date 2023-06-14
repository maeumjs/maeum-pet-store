export const CE_ENTITY_NAME = {
  CATEGORY: 'category',
  CATEGORY_TABLE: 'tbl_category',

  TAG: 'tag',
  TAG_TABLE: 'tbl_tag',

  PET: 'pet',
  PET_TABLE: 'tbl_pet',

  PET_CATEGORY_MTM: 'pet_category_mtm',
  PET_CATEGORY_MTM_TABLE: 'tbl_pet_category_mtm',

  PET_TAG_MTM: 'pet_tag_mtm',
  PET_TAG_MTM_TABLE: 'tbl_pet_tag_mtm',
} as const;

export type CE_ENTITY_NAME = (typeof CE_ENTITY_NAME)[keyof typeof CE_ENTITY_NAME];
