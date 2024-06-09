import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import { ImageEntity } from '#/databases/entities/ImageEntity';
import type { IImageEntity } from '#/databases/interfaces/IImageEntity';
import { where } from '#/databases/modules/where';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { getAsyncTid } from '#/modules/loggings/stores/getAsyncTid';
import { raw } from 'mysql2';

export async function selectById(
  data: {
    id: IImageEntity['id'];
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

    qb[w()]({ id: raw(data.id) });

    const image = await qb.getOne();
    return image;
  } finally {
    await qr.release();
  }
}
