import type { ICategoryEntity } from '#/database/interfaces/ICategoryEntity';
import type { ITid } from '#/dto/common/ITid';

export interface IPutCategoryQuerystringDto extends ITid {}

export interface IPutCategoryParamsDto {
  id: ICategoryEntity['id'];
}

export interface IPutCategoryBodyDto {
  name: ICategoryEntity['name'];
}
