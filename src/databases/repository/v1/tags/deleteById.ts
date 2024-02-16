import { DBContainer } from '#/databases/DBContainer';
import { CE_DATASORUCE_NAME } from '#/databases/const-enum/CE_DATASORUCE_NAME';
import { TagEntity } from '#/databases/entities/TagEntity';
import type { ICategoryEntity } from '#/databases/interfaces/ICategoryEntity';
import { where } from '#/databases/modules/where';
import { getAsyncTid } from '#/modules/logging/store/getAsyncTid';

export async function deleteById(data: { id: ICategoryEntity['id'] }) {
  const tid = getAsyncTid();
  const ds = DBContainer.it.ds(CE_DATASORUCE_NAME.PET_STORE);

  const w = where();
  const qb = ds.getRepository(TagEntity).createQueryBuilder().delete().comment(tid);

  qb[w()]({ id: data.id });

  const result = await qb.execute();

  return { id: data.id, result };
}
