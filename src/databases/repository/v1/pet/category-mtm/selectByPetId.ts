import { DBContainer } from '#/databases/DBContainer';
import { CE_DATASORUCE_NAME } from '#/databases/const-enum/CE_DATASORUCE_NAME';
import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import { PetCategoryMTMEntity } from '#/databases/entities/PetCategoryMTMEntity';
import type { IPetEntity } from '#/databases/interfaces/IPetEntity';
import { where } from '#/databases/modules/where';
import { getAsyncTid } from '#/modules/logging/store/getAsyncTid';

export async function selectByPetId(
  data: { petId: IPetEntity['id'] },
  options?: Partial<{ master: boolean }>,
) {
  const tid = getAsyncTid();
  const ds = DBContainer.it.ds(CE_DATASORUCE_NAME.PET_STORE);
  const isMaster = options?.master ?? false;
  const qr = isMaster ? ds.createQueryRunner('master') : ds.createQueryRunner('slave');
  try {
    const w = where();
    const qb = ds
      .getRepository(PetCategoryMTMEntity)
      .createQueryBuilder(CE_ENTITY_NAME.PET_CATEGORY_MTM, qr)
      .select()
      .comment(tid);

    qb[w()]({ petId: data.petId }).comment(tid);
    const relations = await qb.getMany();

    return relations;
  } finally {
    await qr.release();
  }
}
