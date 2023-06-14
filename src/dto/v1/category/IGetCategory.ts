import type { ICategory } from '#/database/interfaces/ICategory';
import type { ITid } from '#/dto/common/ITid';

export interface IGetCategoryQuerystringDto extends ITid {}

export interface IGetCategoryParamsDto {
  /**
   * category id
   */
  id: ICategory['id'];
}
