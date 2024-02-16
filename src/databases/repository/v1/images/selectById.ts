import { DBContainer } from '#/databases/DBContainer';
import { CE_DATASORUCE_NAME } from '#/databases/const-enum/CE_DATASORUCE_NAME';
import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import { ImageEntity } from '#/databases/entities/ImageEntity';
import type { IImageEntity } from '#/databases/interfaces/IImageEntity';
import { where } from '#/databases/modules/where';
import { getAsyncTid } from '#/modules/logging/store/getAsyncTid';
import { raw } from 'mysql2';

export async function selectById(
  data: {
    id: IImageEntity['id'];
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

    qb[w()]({ id: raw(data.id) });

    const image = await qb.getOne();
    return image;
  } finally {
    await qr.release();
  }
}
