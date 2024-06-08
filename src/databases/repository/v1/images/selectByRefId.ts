import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import { ImageEntity } from '#/databases/entities/ImageEntity';
import type { IImageEntity } from '#/databases/interfaces/IImageEntity';
import { where } from '#/databases/modules/where';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
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
  const ds = container.resolve(CE_DI.PET_DATA_SOURCE);
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
