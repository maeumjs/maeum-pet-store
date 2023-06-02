import { CE_DATABASE_DEFAULT } from '#entities/common/const-enum/CE_DATABASE_DEFAULT';
import ICreatedAtEntity from '#entities/common/interfaces/ICreatedAtEntity';
import { EntitySchema, EntitySchemaColumnOptions } from 'typeorm';

export const CreatedAtEntityColumns = {
  createdAt: {
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'column created timestamp',
    nullable: false,
  } satisfies EntitySchemaColumnOptions,
  createdBy: {
    type: 'varchar',
    name: 'created_by',
    length: CE_DATABASE_DEFAULT.USER_ID_LENGTH,
    nullable: true,
  } satisfies EntitySchemaColumnOptions,
};

export const CreatedAtEntity = new EntitySchema<ICreatedAtEntity>({
  name: 'created-at',
  columns: {
    ...CreatedAtEntityColumns,
  },
});
