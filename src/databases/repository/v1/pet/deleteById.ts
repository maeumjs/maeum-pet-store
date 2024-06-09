import { PetEntity } from '#/databases/entities/PetEntity';
import type { IPetEntity } from '#/databases/interfaces/IPetEntity';
import { where } from '#/databases/modules/where';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { getAsyncTid } from '#/modules/loggings/stores/getAsyncTid';

export async function deleteById(data: { id: IPetEntity['id'] }) {
  const tid = getAsyncTid();
  const ds = container.resolve(CE_DI.PET_DATA_SOURCE);

  const w = where();
  const qb = ds.getRepository(PetEntity).createQueryBuilder().delete().comment(tid);

  qb[w()]({ id: data.id });

  const result = await qb.execute();

  return { id: data.id, result };
}
