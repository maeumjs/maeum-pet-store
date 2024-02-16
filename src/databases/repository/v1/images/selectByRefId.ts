import { DBContainer } from '#/databases/DBContainer';
import { CE_DATASORUCE_NAME } from '#/databases/const-enum/CE_DATASORUCE_NAME';
import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import { ImageEntity } from '#/databases/entities/ImageEntity';
import type { IImageEntity } from '#/databases/interfaces/IImageEntity';
import { where } from '#/databases/modules/where';
import { getAsyncTid } from '#/modules/logging/store/getAsyncTid';
import { raw } from 'mysql2';

export async function selectByRefId(
  data: {
    refId: IImageEntity['refId'];
    entity: IImageEntity['entity'];
  },
  options?: Partial<{ master: boolean }>,
) {
  const tid = getAsyncTid();
  const ds = DBContainer.it.ds(CE_DATASORUCE_NAME.PET_STORE);
  const isMaster = options?.master ?? false;
  const qr = isMaster ? ds.createQueryRunner('master') : ds.createQueryRunner('slave');

  try {
    const w = where();
    const qb = ds
      .getRepository(ImageEntity)
      .createQueryBuilder(CE_ENTITY_NAME.IMAGE, qr)
      .select()
      .comment(tid);

    qb[w()]({ refId: raw(data.refId) });
    qb[w()]({ entity: data.entity });

    const images = await qb.getMany();
    return images;
  } finally {
    await qr.release();
  }
}
