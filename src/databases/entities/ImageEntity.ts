import { CreatedAt } from '#/databases/columns/CreatedAt';
import { PrimaryKey } from '#/databases/columns/PrimaryKey';
import { UpdatedAt } from '#/databases/columns/UpdatedAt';
import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import type { IImageEntity } from '#/databases/interfaces/IImageEntity';
import { EntitySchema } from 'typeorm';

export const ImageEntity = new EntitySchema<IImageEntity>({
  name: CE_ENTITY_NAME.IMAGE,
  tableName: CE_ENTITY_NAME.IMAGE_TABLE,
  columns: {
    ...PrimaryKey,
    refId: {
      ...PrimaryKey.id,
      generated: undefined,
      name: 'ref_id',
      comment: 'image reference entity id',
    },
    entity: {
      name: 'entity',
      type: 'int',
      comment: 'image reference entity',
    },
    metadata: {
      name: 'metadata',
      type: 'text',
      nullable: true,
      comment: 'additional metadata for entity',
    },
    hash: {
      name: 'hash',
      type: 'varchar',
      length: 512,
      comment: 'hash filename to prevent duplicate filenames',
    },
    source: {
      name: 'source',
      type: 'varchar',
      length: 1000,
      comment: 'the filename at the time of upload',
    },
    ...CreatedAt,
    ...UpdatedAt,
  },
});
