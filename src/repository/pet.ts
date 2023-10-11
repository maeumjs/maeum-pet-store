import { DBContainer } from '#/database/DBContainer';
import { CE_ENTITY_NAME } from '#/database/const-enum/CE_ENTITY_NAME';
import { PetEntity } from '#/database/entities/PetEntity';
import type { IDeletePetParamsDto, IDeletePetQuerystringDto } from '#/dto/v1/pet/IDeletePet';
import type { IGetPetParamsDto, IGetPetQuerystringDto } from '#/dto/v1/pet/IGetPet';
import type { IPostPetBodyDto } from '#/dto/v1/pet/IPostPet';
import * as category from '#/repository/category';
import * as tag from '#/repository/tag';

export async function read(querystring: IGetPetQuerystringDto, params: IGetPetParamsDto) {
  const repository = DBContainer.it.ds.getRepository(PetEntity);
  const pet = await repository.findOne({
    where: { id: params.id },
    relations: { [CE_ENTITY_NAME.CATEGORY]: true },
    // relations: { [CE_ENTITY_NAME.CATEGORY]: true, [CE_ENTITY_NAME.TAG]: true },
    comment: querystring.tid,
  });
  return pet;
}

export async function create(dto: IPostPetBodyDto) {
  const repository = DBContainer.it.ds.getRepository(PetEntity);

  // get not created category
  const categories = await category.readsAndCreates(
    dto.category.map((categoryDto) => categoryDto.name),
  );

  // get not created category
  const tags = await tag.readsAndCreates(dto.tag.map((tagDto) => tagDto.name));

  const pet = await repository.save({
    name: dto.name,
    status: dto.status,
    category: categories,
    tag: tags,
  });

  return pet;
}

export async function del(querystring: IDeletePetQuerystringDto, params: IDeletePetParamsDto) {
  const repository = DBContainer.it.ds.getRepository(PetEntity);

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
