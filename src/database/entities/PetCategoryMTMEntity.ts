import { PrimaryKey } from '#/database/columns/PrimaryKey';
import { CE_ENTITY_NAME } from '#/database/const-enum/CE_ENTITY_NAME';
import type { IPetCategoryMTM } from '#/database/interfaces/IPetCategoryMTM';
import { EntitySchema } from 'typeorm';

/**
 * pet and category many-to-many relation
 */
export const PetCategoryMTMEntity = new EntitySchema<IPetCategoryMTM>({
  name: CE_ENTITY_NAME.PET_CATEGORY_MTM,
  tableName: CE_ENTITY_NAME.PET_CATEGORY_MTM_TABLE,
  columns: {
    petId: {
      ...PrimaryKey.id,
      name: 'pet_id',
      generated: undefined,
    },
    categoryId: {
      ...PrimaryKey.id,
      name: 'category_id',
      generated: undefined,
    },
  },
});
