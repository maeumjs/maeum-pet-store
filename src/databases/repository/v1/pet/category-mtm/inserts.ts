import { PetCategoryMTMEntity } from '#/databases/entities/PetCategoryMTMEntity';
import type { IPetCategoryMTMEntity } from '#/databases/interfaces/IPetCategoryMTMEntity';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { getAsyncTid } from '#/modules/logging/store/getAsyncTid';
import type { EntityManager } from 'typeorm';

export async function inserts(
  data: { values: IPetCategoryMTMEntity[] },
  options?: { transation?: EntityManager },
) {
  const tid = getAsyncTid();
  const ds =
    options?.transation != null ? options.transation : container.resolve(CE_DI.PET_DATA_SOURCE);

  const result = await ds
    .getRepository(PetCategoryMTMEntity)
    .createQueryBuilder()
    .insert()
    .values(data.values)
    .updateEntity(false)
    .comment(tid)
    .execute();

  return { result };
}
