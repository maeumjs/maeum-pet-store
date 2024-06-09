import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import { CategoryEntity } from '#/databases/entities/CategoryEntity';
import type { ICategoryEntity } from '#/databases/interfaces/ICategoryEntity';
import { where } from '#/databases/modules/where';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { getAsyncTid } from '#/modules/loggings/stores/getAsyncTid';
import { In } from 'typeorm';

export async function selectByIds(
  data: { ids: ICategoryEntity['id'][] },
  options?: Partial<{ master: boolean }>,
) {
  const tid = getAsyncTid();
  const ds = container.resolve(CE_DI.PET_DATA_SOURCE);
  const isMaster = options?.master ?? false;
  const qr = isMaster ? ds.createQueryRunner('master') : ds.createQueryRunner('slave');

  try {
    const w = where();
    const qb = ds
      .getRepository(CategoryEntity)
      .createQueryBuilder(CE_ENTITY_NAME.CATEGORY, qr)
      .select()
      .comment(tid);

    qb[w()]({ id: In(data.ids) });

    const category = await qb.getMany();
    return category;
  } finally {
    await qr.release();
  }
}
