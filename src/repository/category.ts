import { DBContainer } from '#/database/DBContainer';
import { CategoryEntity } from '#/database/entities/CategoryEntity';
import type { ICategory } from '#/database/interfaces/ICategory';
import type {
  IDeleteCategoryParamsDto,
  IDeleteCategoryQuerystringDto,
} from '#/dto/v1/category/IDeleteCategory';
import type {
  IGetCategoryParamsDto,
  IGetCategoryQuerystringDto,
} from '#/dto/v1/category/IGetCategory';
import type { IPostCategoryBodyDto } from '#/dto/v1/category/IPostCategory';
import { In } from 'typeorm';

export async function create(dto: IPostCategoryBodyDto) {
  const repository = DBContainer.it.ds.getRepository(CategoryEntity);

  const category = await repository.save({
    name: dto.name,
  });

  return category;
}

export async function read(querystring: IGetCategoryQuerystringDto, params: IGetCategoryParamsDto) {
  const repository = DBContainer.it.ds.getRepository(CategoryEntity);

  const category = await repository.find({
    comment: querystring.tid,

    where: {
      id: params.id,
    },
  });

  return category;
}

export async function del(
  querystring: IDeleteCategoryQuerystringDto,
  params: IDeleteCategoryParamsDto,
) {
  const repository = DBContainer.it.ds.getRepository(CategoryEntity);

  const category = await repository.findOne({
    comment: querystring.tid,
    where: {
      id: params.id,
    },
  });

  if (category != null) {
    await repository.delete({ id: params.id });
  }

  return category;
}

export async function reads(names: string[]) {
  const repository = DBContainer.it.ds.getRepository(CategoryEntity);
  const categories = await repository.find({ where: { name: In(names) } });
  return categories;
}

export async function readsAndCreates(names: string[]) {
  const categories = await reads(names);
  const foundedNames = categories.map((category) => category.name);
  const notFoundNames = names.filter((name) => !foundedNames.includes(name));

  const repository = DBContainer.it.ds.getRepository(CategoryEntity);
  const newCategory = await repository.save(
    notFoundNames.map((category) => ({ name: category }) satisfies Omit<ICategory, 'id'>),
  );

  return [...categories, ...newCategory];
}
