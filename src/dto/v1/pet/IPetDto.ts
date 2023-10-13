import type { IPet } from '#/database/interfaces/IPet';
import type { ICategoryDto } from '#/dto/v1/category/ICategoryDto';
import type { ITagDto } from '#/dto/v1/tag/ITagDto';

export interface IPetDto {
  id: IPet['id'];

  name: IPet['name'];

  category: ICategoryDto[];

  tag: ITagDto[];
}
