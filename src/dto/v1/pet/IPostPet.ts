import type { IPetEntity } from '#/database/interfaces/IPetEntity';
import type { ITid } from '#/dto/common/ITid';
import type { ICategoryDto } from '#/dto/v1/category/ICategoryDto';
import type { ITagDto } from '#/dto/v1/tag/ITagDto';

export interface IPostPetQuerystringDto extends ITid {}

export interface IPostPetBodyDto {
  name: IPetEntity['name'];

  status: IPetEntity['status'];

  category: Omit<ICategoryDto, 'id'>[];

  tag: Omit<ITagDto, 'id'>[];
}
