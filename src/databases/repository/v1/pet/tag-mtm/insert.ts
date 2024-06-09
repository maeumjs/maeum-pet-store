import { PetTagMTMEntity } from '#/databases/entities/PetTagMTMEntity';
import type { IPetTagMTMEntity } from '#/databases/interfaces/IPetTagMTMEntity';
import { getInsertedIdOrThrow } from '#/databases/modules/getInsertedId';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { getAsyncTid } from '#/modules/loggings/stores/getAsyncTid';
import type { EntityManager } from 'typeorm';

export async function insert(
  data: { values: IPetTagMTMEntity },
  options?: { transation?: EntityManager },
) {
  const tid = getAsyncTid();
  const ds =
    options?.transation != null ? options.transation : container.resolve(CE_DI.PET_DATA_SOURCE);

  const result = await ds
    .getRepository(PetTagMTMEntity)
    .createQueryBuilder()
    .insert()
    .values(data.values)
    .updateEntity(false)
    .comment(tid)
    .execute();

  const id = getInsertedIdOrThrow<string>(result);

  return { id, result };
}
