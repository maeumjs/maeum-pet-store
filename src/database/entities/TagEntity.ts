import { PrimaryKey } from '#/database/columns/PrimaryKey';
import { CE_ENTITY_NAME } from '#/database/const-enum/CE_ENTITY_NAME';
import type { ITagEntity } from '#/database/interfaces/ITagEntity';
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
