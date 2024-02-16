import type { IPetEntity } from '#/databases/interfaces/IPetEntity';
import type { ITid } from '#/dto/common/ITid';
import type { ICategoryDto } from '#/dto/v1/category/ICategoryDto';
import type { ITagDto } from '#/dto/v1/tag/ITagDto';
import type { TSimpleSetOptional } from '#/modules/type-utils/TSimpleSetOptional';

export interface IPutPetQuerystringDto extends ITid {}

export interface IPutPetParamsDto {
  id: IPetEntity['id'];
}

export interface IPutPetBodyDto {
  name: IPetEntity['name'];

  status: IPetEntity['status'];

  category: TSimpleSetOptional<ICategoryDto, 'id'>[];

  tag: TSimpleSetOptional<ITagDto, 'id'>[];
}
