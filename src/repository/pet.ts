import { DBContainer } from '#/database/DBContainer';
import { CE_DATASORUCE_NAME } from '#/database/const-enum/CE_DATASORUCE_NAME';
import { CE_ENTITY_NAME } from '#/database/const-enum/CE_ENTITY_NAME';
import { CategoryEntity } from '#/database/entities/CategoryEntity';
import { PetCategoryMTMEntity } from '#/database/entities/PetCategoryMTMEntity';
import { PetEntity } from '#/database/entities/PetEntity';
import { PetTagMTMEntity } from '#/database/entities/PetTagMTMEntity';
import { TagEntity } from '#/database/entities/TagEntity';
import type { ICategory } from '#/database/interfaces/ICategory';
import type { IPet } from '#/database/interfaces/IPet';
import type { ITag } from '#/database/interfaces/ITag';
import type { IDeletePetParamsDto, IDeletePetQuerystringDto } from '#/dto/v1/pet/IDeletePet';
import type { IGetPetParamsDto, IGetPetQuerystringDto } from '#/dto/v1/pet/IGetPet';
import type { IPostPetBodyDto } from '#/dto/v1/pet/IPostPet';
import type { IPutPetBodyDto, IPutPetParamsDto, IPutPetQuerystringDto } from '#/dto/v1/pet/IPutPet';
import * as categoryRepository from '#/repository/category';
import * as tagRepository from '#/repository/tag';
import { In } from 'typeorm';

export async function read(querystring: IGetPetQuerystringDto, params: IGetPetParamsDto) {
  const repository = DBContainer.it.ds(CE_DATASORUCE_NAME.PET_STORE).getRepository(PetEntity);
  const pet = await repository.findOne({
    where: { id: params.id },
    relations: { [CE_ENTITY_NAME.CATEGORY]: true, [CE_ENTITY_NAME.TAG]: true },
    comment: querystring.tid,
  });
  return pet;
}

export async function create(dto: IPostPetBodyDto) {
  const repository = DBContainer.it.ds(CE_DATASORUCE_NAME.PET_STORE).getRepository(PetEntity);

  // get not created category
  const categories = await categoryRepository.readsAndCreates(
    dto.category.map((categoryDto) => categoryDto.name),
  );

  // get not created category
  const tags = await tagRepository.readsAndCreates(dto.tag.map((tagDto) => tagDto.name));

  const pet = await repository.save({
    name: dto.name,
    status: dto.status,
    category: categories,
    tag: tags,
  });

  return pet;
}

export function getRelations(
  asIs: ICategory[] | ITag[],
  toBe: ICategory[] | ITag[],
): { delete: ICategory[] | ITag[]; create: ICategory[] | ITag[] } {
  const willDelete = asIs.filter(
    (asIsEntity) => !toBe.map((toBeEntity) => toBeEntity.id).includes(asIsEntity.id),
  );
  const willCreate = toBe.filter(
    (toBeEntity) => !asIs.map((asIsEntity) => asIsEntity.id).includes(toBeEntity.id),
  );

  return { delete: willDelete, create: willCreate };
}

async function getCategories(tid: string, pet: IPet) {
  const relations = await DBContainer.it
    .ds(CE_DATASORUCE_NAME.PET_STORE)
    .getRepository(PetCategoryMTMEntity)
    .createQueryBuilder()
    .select()
    .where({ petId: pet.id })
    .comment(tid)
    .getMany();

  if (relations.length <= 0) {
    return [];
  }

  const categories = await DBContainer.it
    .ds(CE_DATASORUCE_NAME.PET_STORE)
    .getRepository(CategoryEntity)
    .createQueryBuilder()
    .select()
    .where({ id: In(relations.map((relation) => relation.categoryId)) })
    .comment(tid)
    .getMany();

  return categories;
}

async function getTags(tid: string, pet: IPet) {
  const relations = await DBContainer.it
    .ds(CE_DATASORUCE_NAME.PET_STORE)
    .getRepository(PetTagMTMEntity)
    .createQueryBuilder()
    .select()
    .where({ petId: pet.id })
    .comment(tid)
    .getMany();

  if (relations.length <= 0) {
    return [];
  }

  const categories = await DBContainer.it
    .ds(CE_DATASORUCE_NAME.PET_STORE)
    .getRepository(TagEntity)
    .createQueryBuilder()
    .select()
    .where({ id: In(relations.map((relation) => relation.tagId)) })
    .comment(tid)
    .getMany();

  return categories;
}

export async function update(
  querystring: IPutPetQuerystringDto,
  params: IPutPetParamsDto,
  body: IPutPetBodyDto,
) {
  const qb = DBContainer.it
    .ds(CE_DATASORUCE_NAME.PET_STORE)
    .getRepository(PetEntity)
    .createQueryBuilder();

  const pet = await qb.select().where({ id: params.id }).comment(querystring.tid).getOne();

  if (pet == null) {
    return undefined;
  }

  const categories = await getCategories(querystring.tid, pet);
  const tags = await getTags(querystring.tid, pet);

  const categoryChange = getRelations(categories, body.category);
  const tagChange = getRelations(tags, body.tag);

  await DBContainer.it.ds(CE_DATASORUCE_NAME.PET_STORE).transaction(async (tran) => {
    await tran
      .getRepository(PetCategoryMTMEntity)
      .createQueryBuilder()
      .delete()
      // .where({ categoryId: In(categoryChange.delete.map((category) => category.id)) })
      .where(
        'categoryId = :id',
        categoryChange.delete.map((category) => category.id),
      )
      .comment(querystring.tid)
      .execute();

    await tran
      .getRepository(PetCategoryMTMEntity)
      .createQueryBuilder()
      .insert()
      .values(
        categoryChange.create.map((category) => ({ categoryId: category.id, petId: params.id })),
      )
      .comment(querystring.tid)
      .execute();

    await tran
      .getRepository(PetTagMTMEntity)
      .createQueryBuilder()
      .delete()
      .where({ tagId: In(categoryChange.delete.map((category) => category.id)) })
      .comment(querystring.tid)
      .execute();

    await tran
      .getRepository(PetTagMTMEntity)
      .createQueryBuilder()
      .insert()
      .values(tagChange.create.map((tag) => ({ tagId: tag.id, petId: params.id })))
      .comment(querystring.tid)
      .execute();
  });

  const next = await read(querystring, params);

  return next;
}

export async function del(querystring: IDeletePetQuerystringDto, params: IDeletePetParamsDto) {
  const repository = DBContainer.it.ds(CE_DATASORUCE_NAME.PET_STORE).getRepository(PetEntity);

  const pet = await repository.findOne({
    comment: querystring.tid,
    where: {
      id: params.id,
    },
    relations: {
      category: true,
      tag: true,
    },
  });

  if (pet != null) {
    await repository.delete({ id: params.id });
  }

  return pet;
}
