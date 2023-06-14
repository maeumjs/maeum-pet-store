import { DBContainer } from '#/database/DBContainer';
import { TagEntity } from '#/database/entities/TagEntity';
import type { ITag } from '#/database/interfaces/ITag';
import type { IDeleteTagParamsDto, IDeleteTagQuerystringDto } from '#/dto/v1/tag/IDeleteTag';
import type { IGetTagParamsDto, IGetTagQuerystringDto } from '#/dto/v1/tag/IGetTag';
import type { IPostTagBodyDto } from '#/dto/v1/tag/IPostTag';
import { In } from 'typeorm';

export async function create(dto: IPostTagBodyDto) {
  const repository = DBContainer.it.ds.getRepository(TagEntity);

  const tag = await repository.save({
    name: dto.name,
  });

  return tag;
}

export async function read(querystring: IGetTagQuerystringDto, params: IGetTagParamsDto) {
  const repository = DBContainer.it.ds.getRepository(TagEntity);

  const tag = await repository.findOne({
    comment: querystring.tid,
    where: {
      id: params.id,
    },
  });

  return tag;
}

export async function del(querystring: IDeleteTagQuerystringDto, params: IDeleteTagParamsDto) {
  const repository = DBContainer.it.ds.getRepository(TagEntity);

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
  const repository = DBContainer.it.ds.getRepository(TagEntity);
  const tags = await repository.find({ where: { name: In(names) } });
  return tags;
}

export async function readsAndCreates(names: string[]) {
  const tags = await reads(names);
  const foundedNames = tags.map((tag) => tag.name);
  const notFoundNames = names.filter((name) => !foundedNames.includes(name));

  const repository = DBContainer.it.ds.getRepository(TagEntity);
  const newCategory = await repository.save(
    notFoundNames.map((category) => ({ name: category }) satisfies Omit<ITag, 'id'>),
  );

  return [...tags, ...newCategory];
}
