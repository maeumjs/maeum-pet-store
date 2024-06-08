import { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import { PetEntity } from '#/databases/entities/PetEntity';
import type { IPetEntity, IPetRelation } from '#/databases/interfaces/IPetEntity';
import { where } from '#/databases/modules/where';
import { selectByIds as selectCategoryByIds } from '#/databases/repository/v1/categories/selectByIds';
import { selectByPetId as selectCategoryMtMByPetId } from '#/databases/repository/v1/pet/category-mtm/selectByPetId';
import { selectByPetId as selectTagMtMByPetId } from '#/databases/repository/v1/pet/tag-mtm/selectByPetId';
import { selectByIds as selectTagByIds } from '#/databases/repository/v1/tags/selectByIds';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { getAsyncTid } from '#/modules/logging/store/getAsyncTid';

export async function selectById(
  data: { id: IPetEntity['id'] },
  options?: Partial<{ master: boolean; withCategory?: boolean; withTag?: boolean }>,
): Promise<(IPetEntity & IPetRelation) | undefined> {
  const tid = getAsyncTid();
  const ds = container.resolve(CE_DI.PET_DATA_SOURCE);
  const isMaster = options?.master ?? false;
  const qr = isMaster ? ds.createQueryRunner('master') : ds.createQueryRunner('slave');

  try {
    const w = where();
    const qb = ds
      .getRepository(PetEntity)
      .createQueryBuilder(CE_ENTITY_NAME.PET, qr)
      .select()
      .comment(tid);

    qb[w()]({ id: data.id });

    const pet = await qb.getOne();

    if (pet != null) {
      const [categoryRelations, tagRelations] = await Promise.all([
        options?.withCategory ?? false
          ? selectCategoryMtMByPetId({ petId: pet.id })
          : Promise.resolve([]),
        options?.withTag ?? false ? selectTagMtMByPetId({ petId: pet.id }) : Promise.resolve([]),
      ]);

      const [categories, tags] = await Promise.all([
        categoryRelations.length > 0
          ? selectCategoryByIds({ ids: categoryRelations.map((relation) => relation.categoryId) })
          : Promise.resolve([]),
        tagRelations.length > 0
          ? selectTagByIds({ ids: tagRelations.map((relation) => relation.tagId) })
          : Promise.resolve([]),
      ]);

      return {
        ...pet,
        category: categories,
        tag: tags,
      };
    }

    return undefined;
  } finally {
    await qr.release();
  }
}
