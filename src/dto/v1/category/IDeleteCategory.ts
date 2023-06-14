import type { ICategory } from '#/database/interfaces/ICategory';
import type { ITid } from '#/dto/common/ITid';

export interface IDeleteCategoryQuerystringDto extends ITid {}

export interface IDeleteCategoryParamsDto {
  /**
   * category id
   */
  id: ICategory['id'];
}
