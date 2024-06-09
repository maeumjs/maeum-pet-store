import { TagEntity } from '#/databases/entities/TagEntity';
import type { ICategoryEntity } from '#/databases/interfaces/ICategoryEntity';
import { where } from '#/databases/modules/where';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { getAsyncTid } from '#/modules/loggings/stores/getAsyncTid';

export async function updateById(data: { values: ICategoryEntity }) {
  const tid = getAsyncTid();
  const ds = container.resolve(CE_DI.PET_DATA_SOURCE);
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
