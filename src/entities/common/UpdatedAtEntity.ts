import { CE_DATABASE_DEFAULT } from '#entities/common/const-enum/CE_DATABASE_DEFAULT';
import IUpdatedAtEntity from '#entities/common/interfaces/IUpdatedAtEntity';
import { EntitySchema, EntitySchemaColumnOptions } from 'typeorm';

export const UpdatedAtEntityColumns = {
  updatedAt: {
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'column created timestamp',
    nullable: false,
  } satisfies EntitySchemaColumnOptions,
  updatedBy: {
    type: 'varchar',
    name: 'updated_by',
    length: CE_DATABASE_DEFAULT.USER_ID_LENGTH,
    nullable: true,
  } satisfies EntitySchemaColumnOptions,
};

const UpdatedAtEntity = new EntitySchema<IUpdatedAtEntity>({
  name: 'updated-at',
  columns: {
    ...UpdatedAtEntityColumns,
  },
});

export default UpdatedAtEntity;
