import { PrimaryKey } from '#/databases/columns/PrimaryKey';
import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import type { ICategoryEntity } from '#/databases/interfaces/ICategoryEntity';
import { EntitySchema } from 'typeorm';

export const CategoryEntity = new EntitySchema<ICategoryEntity>({
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
});
