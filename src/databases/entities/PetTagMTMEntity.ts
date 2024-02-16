import { PrimaryKey } from '#/databases/columns/PrimaryKey';
import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import type { IPetTagMTMEntity } from '#/databases/interfaces/IPetTagMTMEntity';
import { EntitySchema } from 'typeorm';

/**
 * pet and tag many-to-many relation
 */
export const PetTagMTMEntity = new EntitySchema<IPetTagMTMEntity>({
  name: CE_ENTITY_NAME.PET_TAG_MTM,
  tableName: CE_ENTITY_NAME.PET_TAG_MTM_TABLE,
  columns: {
    petId: {
      ...PrimaryKey.id,
      name: 'pet_id',
      generated: undefined,
    },
    tagId: {
      ...PrimaryKey.id,
      name: 'tag_id',
      generated: undefined,
    },
  },
});
