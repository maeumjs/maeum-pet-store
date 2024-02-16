import type { ICategoryEntity } from '#/databases/interfaces/ICategoryEntity';
import type { ITid } from '#/dto/common/ITid';

export interface IDeleteCategoryQuerystringDto extends ITid {}

export interface IDeleteCategoryParamsDto {
  /**
   * category id
   */
  id: ICategoryEntity['id'];
}
