import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import { TagEntity } from '#/databases/entities/TagEntity';
import type { ICategoryEntity } from '#/databases/interfaces/ICategoryEntity';
import { where } from '#/databases/modules/where';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { getAsyncTid } from '#/modules/loggings/stores/getAsyncTid';

export async function selectById(
  data: { id: ICategoryEntity['id'] },
  options?: Partial<{ master: boolean }>,
) {
  const tid = getAsyncTid();
  const ds = container.resolve(CE_DI.PET_DATA_SOURCE);
  const isMaster = options?.master ?? false;
  const qr = isMaster ? ds.createQueryRunner('master') : ds.createQueryRunner('slave');

  try {
    const w = where();
    const qb = ds
      .getRepository(TagEntity)
      .createQueryBuilder(CE_ENTITY_NAME.TAG, qr)
      .select()
      .comment(tid);

    qb[w()]({ id: data.id });

    const tag = await qb.getOne();
    return tag;
  } finally {
    await qr.release();
  }
}
