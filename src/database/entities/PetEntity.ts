import { PrimaryKey } from '#/database/columns/PrimaryKey';
import { CE_ENTITY_NAME } from '#/database/const-enum/CE_ENTITY_NAME';
import type { IPet, IPetRelations } from '#/database/interfaces/IPet';
import { EntitySchema } from 'typeorm';

export const PetEntity = new EntitySchema<IPet & IPetRelations>({
  name: CE_ENTITY_NAME.PET,
  tableName: CE_ENTITY_NAME.PET_TABLE,
  columns: {
    ...PrimaryKey,
    name: {
      name: 'name',
      type: 'varchar',
      length: 200,
      nullable: false,
      comment: 'pet name',
    },
    status: {
      name: 'status',
      type: 'char',
      length: 10,
      nullable: false,
      comment: 'pet status',
    },
  },
  relations: {
    [CE_ENTITY_NAME.CATEGORY]: {
      target: CE_ENTITY_NAME.CATEGORY,
      type: 'many-to-many',
      createForeignKeyConstraints: false,
      joinTable: {
        name: CE_ENTITY_NAME.PET_CATEGORY_MTM_TABLE,
        joinColumn: {
          name: 'pet_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'category_id',
          referencedColumnName: 'id',
        },
        synchronize: false,
      },
    },
    [CE_ENTITY_NAME.TAG]: {
      target: CE_ENTITY_NAME.TAG,
      type: 'many-to-many',
      joinTable: {
        name: CE_ENTITY_NAME.PET_TAG_MTM_TABLE,
        joinColumn: {
          name: 'pet_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'tag_id',
          referencedColumnName: 'id',
        },
        synchronize: false,
      },
    },
  },
});
