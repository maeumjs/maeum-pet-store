import { PrimaryKey } from '#/databases/columns/PrimaryKey';
import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import type { ICategoryEntity, ICategoryRelation } from '#/databases/interfaces/ICategoryEntity';
import { EntitySchema } from 'typeorm';

export const CategoryEntity = new EntitySchema<ICategoryEntity & ICategoryRelation>({
  name: CE_ENTITY_NAME.CATEGORY,
  tableName: CE_ENTITY_NAME.CATEGORY_TABLE,
  columns: {
    ...PrimaryKey,
    name: {
      name: 'name',
      type: 'varchar',
      length: 200,
      nullable: false,
      comment: 'category name',
    },
  },
  relations: {
    [CE_ENTITY_NAME.PET]: {
      target: CE_ENTITY_NAME.PET,
      type: 'many-to-many',
      joinTable: {
        name: CE_ENTITY_NAME.PET_CATEGORY_MTM_TABLE,
        joinColumn: {
          name: 'category_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'pet_id',
          referencedColumnName: 'id',
        },
        synchronize: false,
      },
    },
  },
});
