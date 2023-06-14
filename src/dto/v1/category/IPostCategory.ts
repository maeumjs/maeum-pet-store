import type { ICategory } from '#/database/interfaces/ICategory';
import type { ITid } from '#/dto/common/ITid';

export interface IPostCategoryQuerystringDto extends ITid {}

export interface IPostCategoryBodyDto {
  /**
   * category name
   */
  name: ICategory['name'];
}
