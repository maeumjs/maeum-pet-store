import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import { PetTagMTMEntity } from '#/databases/entities/PetTagMTMEntity';
import type { IPetEntity } from '#/databases/interfaces/IPetEntity';
import { where } from '#/databases/modules/where';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { getAsyncTid } from '#/modules/logging/store/getAsyncTid';

export async function selectByPetId(
  data: { petId: IPetEntity['id'] },
  options?: Partial<{ master: boolean }>,
) {
  const tid = getAsyncTid();
  const ds = container.resolve(CE_DI.PET_DATA_SOURCE);
  const isMaster = options?.master ?? false;
  const qr = isMaster ? ds.createQueryRunner('master') : ds.createQueryRunner('slave');
  try {
    const w = where();
    const qb = ds
      .getRepository(PetTagMTMEntity)
      .createQueryBuilder(CE_ENTITY_NAME.PET_TAG_MTM, qr)
      .select()
      .comment(tid);

    qb[w()]({ petId: data.petId }).comment(tid);
    const relations = await qb.getMany();

    return relations;
  } finally {
    await qr.release();
  }
}
