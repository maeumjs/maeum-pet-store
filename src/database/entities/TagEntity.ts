import { PrimaryKey } from '#/database/columns/PrimaryKey';
import { CE_ENTITY_NAME } from '#/database/const-enum/CE_ENTITY_NAME';
import type { ITag } from '#/database/interfaces/ITag';
import { EntitySchema } from 'typeorm';

export const TagEntity = new EntitySchema<ITag>({
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
