import type { CE_IMAGE_REFERENCE_ENTITY } from '#/databases/const-enum/CE_IMAGE_REFERENCE_ENTITY';
import { ImageEntity } from '#/databases/entities/ImageEntity';
import type { IImageEntity } from '#/databases/interfaces/IImageEntity';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { getAsyncTid } from '#/modules/loggings/stores/getAsyncTid';
import { safeStringify } from '@maeum/tools';

export async function insert(data: {
  refId: string;
  metadata: unknown;
  entity: CE_IMAGE_REFERENCE_ENTITY;
  source: IImageEntity['source'];
  hash: IImageEntity['hash'];
}) {
  const tid = getAsyncTid();
  const ds = container.resolve(CE_DI.PET_DATA_SOURCE);
  const qb = ds.getRepository(ImageEntity).createQueryBuilder();

  const result = await qb
    .insert()
    .values({
      refId: data.refId,
      metadata: safeStringify(data.metadata),
      entity: data.entity,
    })
    .updateEntity(false)
    .comment(tid)
    .execute();

  return result;
}
