import { DBContainer } from '#/databases/DBContainer';
import { CE_DATASORUCE_NAME } from '#/databases/const-enum/CE_DATASORUCE_NAME';
import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import { CategoryEntity } from '#/databases/entities/CategoryEntity';
import type { ICategoryEntity } from '#/databases/interfaces/ICategoryEntity';
import { where } from '#/databases/modules/where';
import { getAsyncTid } from '#/modules/logging/store/getAsyncTid';
import { raw } from 'mysql2';

export async function selectById(
  data: { id: ICategoryEntity['id'] },
  options?: Partial<{ master: boolean }>,
) {
  const tid = getAsyncTid();
  const ds = DBContainer.it.ds(CE_DATASORUCE_NAME.PET_STORE);
  const isMaster = options?.master ?? false;
  const qr = isMaster ? ds.createQueryRunner('master') : ds.createQueryRunner('slave');

  try {
    const w = where();
    const qb = ds
      .getRepository(CategoryEntity)
      .createQueryBuilder(CE_ENTITY_NAME.CATEGORY, qr)
      .select()
      .comment(tid);

    qb[w()]({ id: raw(data.id) });

    const category = await qb.getOne();
    return category;
  } finally {
    await qr.release();
  }
}
