import { PrimaryKey } from '#/databases/columns/PrimaryKey';
import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import type { IPetCategoryMTMEntity } from '#/databases/interfaces/IPetCategoryMTMEntity';
import { EntitySchema } from 'typeorm';

/**
 * pet and category many-to-many relation
 */
export const PetCategoryMTMEntity = new EntitySchema<IPetCategoryMTMEntity>({
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
