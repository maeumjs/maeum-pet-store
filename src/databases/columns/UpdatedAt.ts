import type { EntitySchemaColumnOptions } from 'typeorm';

export const UpdatedAt: Record<string, EntitySchemaColumnOptions> = {
  updatedAt: {
    name: 'updated_at',
    type: 'datetime',
    comment: 'updated at the time for entity',
    default: () => 'CURRENT_TIMESTAMP',
  },
};
