import { DBContainer } from '#/databases/DBContainer';
import { CE_DATASORUCE_NAME } from '#/databases/const-enum/CE_DATASORUCE_NAME';
import { TagEntity } from '#/databases/entities/TagEntity';
import type { ICategoryEntity } from '#/databases/interfaces/ICategoryEntity';
import { where } from '#/databases/modules/where';
import { getAsyncTid } from '#/modules/logging/store/getAsyncTid';

export async function updateById(data: { values: ICategoryEntity }) {
  const tid = getAsyncTid();
  const ds = DBContainer.it.ds(CE_DATASORUCE_NAME.PET_STORE);
  const { id, ...set } = data.values;

  const w = where();
  const qb = ds
    .getRepository(TagEntity)
    .createQueryBuilder()
    .update()
    .set(set)
    .updateEntity(false)
    .comment(tid);

  qb[w()]({ id });

  const result = await qb.execute();

  return { id, result };
}
