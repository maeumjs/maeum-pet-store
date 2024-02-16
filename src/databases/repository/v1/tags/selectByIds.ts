import { DBContainer } from '#/databases/DBContainer';
import { CE_DATASORUCE_NAME } from '#/databases/const-enum/CE_DATASORUCE_NAME';
import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import { TagEntity } from '#/databases/entities/TagEntity';
import type { ICategoryEntity } from '#/databases/interfaces/ICategoryEntity';
import { where } from '#/databases/modules/where';
import { getAsyncTid } from '#/modules/logging/store/getAsyncTid';
import { In } from 'typeorm';

export async function selectByIds(
  data: { ids: ICategoryEntity['id'][] },
  options?: Partial<{ master: boolean }>,
) {
  const tid = getAsyncTid();
  const ds = DBContainer.it.ds(CE_DATASORUCE_NAME.PET_STORE);
  const isMaster = options?.master ?? false;
  const qr = isMaster ? ds.createQueryRunner('master') : ds.createQueryRunner('slave');

  try {
    const w = where();
    const qb = ds
      .getRepository(TagEntity)
      .createQueryBuilder(CE_ENTITY_NAME.TAG, qr)
      .select()
      .comment(tid);

    qb[w()]({ id: In(data.ids) });

    const tags = await qb.getMany();
    return tags;
  } finally {
    await qr.release();
  }
}
