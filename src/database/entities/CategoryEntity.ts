import { PrimaryKey } from '#/database/columns/PrimaryKey';
import { CE_ENTITY_NAME } from '#/database/const-enum/CE_ENTITY_NAME';
import type { ICategory } from '#/database/interfaces/ICategory';
import { EntitySchema } from 'typeorm';

export const CategoryEntity = new EntitySchema<ICategory>({
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
