import type { EntitySchemaColumnOptions } from 'typeorm';

export const CreatedAt: Record<string, EntitySchemaColumnOptions> = {
  createdAt: {
    name: 'created_at',
    type: 'datetime',
    comment: 'created at the time for entity',
    default: () => 'CURRENT_TIMESTAMP',
  },
};
