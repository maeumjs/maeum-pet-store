import { DBContainer } from '#/databases/DBContainer';
import { CE_DATASORUCE_NAME } from '#/databases/const-enum/CE_DATASORUCE_NAME';
import { PetCategoryMTMEntity } from '#/databases/entities/PetCategoryMTMEntity';
import type { IPetCategoryMTMEntity } from '#/databases/interfaces/IPetCategoryMTMEntity';
import { getInsertedIdOrThrow } from '#/databases/modules/getInsertedId';
import { getAsyncTid } from '#/modules/logging/store/getAsyncTid';
import type { EntityManager } from 'typeorm';

export async function insert(
  data: { values: IPetCategoryMTMEntity },
  options?: { transation?: EntityManager },
) {
  const tid = getAsyncTid();
  const ds =
    options?.transation != null
      ? options.transation
      : DBContainer.it.ds(CE_DATASORUCE_NAME.PET_STORE);

  const result = await ds
    .getRepository(PetCategoryMTMEntity)
    .createQueryBuilder()
    .insert()
    .values(data.values)
    .updateEntity(false)
    .comment(tid)
    .execute();

  const id = getInsertedIdOrThrow<string>(result);

  return { id, result };
}
