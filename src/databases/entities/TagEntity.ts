import { PrimaryKey } from '#/databases/columns/PrimaryKey';
import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import type { ITagEntity, ITagRelation } from '#/databases/interfaces/ITagEntity';
import { EntitySchema } from 'typeorm';

export const TagEntity = new EntitySchema<ITagEntity & ITagRelation>({
  name: CE_ENTITY_NAME.TAG,
  tableName: CE_ENTITY_NAME.TAG_TABLE,
  columns: {
    ...PrimaryKey,
    name: {
      name: 'name',
      type: 'varchar',
      length: 200,
      nullable: false,
      comment: 'tag name',
    },
  },
  relations: {
    [CE_ENTITY_NAME.PET]: {
      target: CE_ENTITY_NAME.PET,
      type: 'many-to-many',
      joinTable: {
        name: CE_ENTITY_NAME.PET_TAG_MTM_TABLE,
        joinColumn: {
          name: 'tag_id',
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
