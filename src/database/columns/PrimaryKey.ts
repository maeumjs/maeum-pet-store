import type { EntitySchemaColumnOptions } from 'typeorm';

export const PrimaryKey: Record<string, EntitySchemaColumnOptions> = {
  id: {
    name: 'id',
    type: 'bigint',
    primary: true,
    generated: 'increment',
    comment: 'primary key with auto increment',
  },
};
