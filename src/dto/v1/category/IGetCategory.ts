import type { ICategoryEntity } from '#/databases/interfaces/ICategoryEntity';
import type { ITid } from '#/dto/common/ITid';

export interface IGetCategoryQuerystringDto extends ITid {}

export interface IGetCategoryParamsDto {
  /**
   * category id
   */
  id: ICategoryEntity['id'];
}
