import { TagEntity } from '#/databases/entities/TagEntity';
import type { ITagEntity } from '#/databases/interfaces/ITagEntity';
import type { IDeleteTagParamsDto, IDeleteTagQuerystringDto } from '#/dto/v1/tag/IDeleteTag';
import type { IGetTagParamsDto, IGetTagQuerystringDto } from '#/dto/v1/tag/IGetTag';
import type { IPostTagBodyDto } from '#/dto/v1/tag/IPostTag';
import type { IPutTagBodyDto, IPutTagParamsDto, IPutTagQuerystringDto } from '#/dto/v1/tag/IPutTag';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { In } from 'typeorm';

export async function create(dto: IPostTagBodyDto) {
  const ds = container.resolve(CE_DI.PET_DATA_SOURCE);
  const repository = ds.getRepository(TagEntity);

  const tag = await repository.save({
    name: dto.name,
  });

  return tag;
}

export async function read(querystring: IGetTagQuerystringDto, params: IGetTagParamsDto) {
  const ds = container.resolve(CE_DI.PET_DATA_SOURCE);
  const repository = ds.getRepository(TagEntity);

  const tag = await repository.findOne({
    comment: querystring.tid,
    where: {
      id: params.id,
    },
  });

  return tag;
}

export async function update(
  _querystring: IPutTagQuerystringDto,
  params: IPutTagParamsDto,
  body: IPutTagBodyDto,
) {
  const ds = container.resolve(CE_DI.PET_DATA_SOURCE);
  const repository = ds.getRepository(TagEntity);

  const category = await repository.update({ id: params.id }, { name: body.name });

  return category;
}

export async function del(querystring: IDeleteTagQuerystringDto, params: IDeleteTagParamsDto) {
  const ds = container.resolve(CE_DI.PET_DATA_SOURCE);
  const repository = ds.getRepository(TagEntity);

  const tag = await repository.findOne({
    comment: querystring.tid,
    where: {
      id: params.id,
    },
  });

  if (tag != null) {
    await repository.delete({ id: params.id });
  }

  return tag;
}

export async function reads(names: string[]) {
  const ds = container.resolve(CE_DI.PET_DATA_SOURCE);
  const repository = ds.getRepository(TagEntity);
  const tags = await repository.find({ where: { name: In(names) } });
  return tags;
}

export async function readsAndCreates(names: string[]) {
  const tags = await reads(names);
  const foundedNames = tags.map((tag) => tag.name);
  const notFoundNames = names.filter((name) => !foundedNames.includes(name));

  const ds = container.resolve(CE_DI.PET_DATA_SOURCE);
  const repository = ds.getRepository(TagEntity);
  const newCategory = await repository.save(
    notFoundNames.map((category) => ({ name: category }) satisfies Omit<ITagEntity, 'id'>),
  );

  return [...tags, ...newCategory];
}
