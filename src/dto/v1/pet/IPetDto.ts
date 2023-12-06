import type { IPetEntity } from '#/database/interfaces/IPetEntity';
import type { ICategoryDto } from '#/dto/v1/category/ICategoryDto';
import type { ITagDto } from '#/dto/v1/tag/ITagDto';

export interface IPetDto {
  id: IPetEntity['id'];

  name: IPetEntity['name'];

  category: ICategoryDto[];

  tag: ITagDto[];
}
