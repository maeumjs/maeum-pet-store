import { DBContainer } from '#/databases/DBContainer';
import { CE_DATASORUCE_NAME } from '#/databases/const-enum/CE_DATASORUCE_NAME';
import type { CE_IMAGE_REFERENCE_ENTITY } from '#/databases/const-enum/CE_IMAGE_REFERENCE_ENTITY';
import { ImageEntity } from '#/databases/entities/ImageEntity';
import type { IImageEntity } from '#/databases/interfaces/IImageEntity';
import { getAsyncTid } from '#/modules/logging/store/getAsyncTid';
import { safeStringify } from '@maeum/tools';

export async function insert(data: {
  refId: string;
  metadata: unknown;
  entity: CE_IMAGE_REFERENCE_ENTITY;
  source: IImageEntity['source'];
  hash: IImageEntity['hash'];
}) {
  const tid = getAsyncTid();
  const qb = DBContainer.it
    .ds(CE_DATASORUCE_NAME.PET_STORE)
    .getRepository(ImageEntity)
    .createQueryBuilder();

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
