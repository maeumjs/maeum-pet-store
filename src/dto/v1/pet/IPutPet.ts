import type { IPet } from '#/database/interfaces/IPet';
import type { ITid } from '#/dto/common/ITid';
import type { ICategoryDto } from '#/dto/v1/category/ICategoryDto';
import type { ITagDto } from '#/dto/v1/tag/ITagDto';

export interface IPutPetQuerystringDto extends ITid {}

export interface IPutPetParamsDto {
  id: IPet['id'];
}

export interface IPutPetBodyDto {
  name: IPet['name'];

  status: IPet['status'];

  category: ICategoryDto[];

  tag: ITagDto[];
}
