import IBaseEntity from '#entities/common/interfaces/IBaseEntity';
import { EntitySchema, EntitySchemaColumnOptions } from 'typeorm';

export const BaseEntityColumns = {
  id: {
    type: 'bigint',
    unsigned: true,
    primary: true,
    generated: true,
  } satisfies EntitySchemaColumnOptions,
  oid: {
    primary: true,
    type: 'varchar',
    length: 46,
    nullable: false,
  } satisfies EntitySchemaColumnOptions,
};

export const BaseEntity = new EntitySchema<IBaseEntity>({
  name: 'base_entity',
  columns: {
    ...BaseEntityColumns,
  },
});
