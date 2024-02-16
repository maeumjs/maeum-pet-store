import { PrimaryKey } from '#/databases/columns/PrimaryKey';
import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import type { ITagEntity } from '#/databases/interfaces/ITagEntity';
import { EntitySchema } from 'typeorm';

export const TagEntity = new EntitySchema<ITagEntity>({
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
});
