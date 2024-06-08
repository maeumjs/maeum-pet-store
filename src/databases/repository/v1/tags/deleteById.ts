import { TagEntity } from '#/databases/entities/TagEntity';
import type { ICategoryEntity } from '#/databases/interfaces/ICategoryEntity';
import { where } from '#/databases/modules/where';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { getAsyncTid } from '#/modules/logging/store/getAsyncTid';

export async function deleteById(data: { id: ICategoryEntity['id'] }) {
  const tid = getAsyncTid();
  const ds = container.resolve(CE_DI.PET_DATA_SOURCE);

  const w = where();
  const qb = ds.getRepository(TagEntity).createQueryBuilder().delete().comment(tid);

  qb[w()]({ id: data.id });

  const result = await qb.execute();

  return { id: data.id, result };
}
