import type { ICategory } from '#/database/interfaces/ICategory';
import type { ITid } from '#/dto/common/ITid';

export interface IPutCategoryQuerystringDto extends ITid {}

export interface IPutCategoryParamsDto {
  id: ICategory['id'];
}

export interface IPutCategoryBodyDto {
  name: ICategory['name'];
}
