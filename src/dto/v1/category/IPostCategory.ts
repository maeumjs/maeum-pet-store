import type { ICategoryEntity } from '#/database/interfaces/ICategoryEntity';
import type { ITid } from '#/dto/common/ITid';

export interface IPostCategoryQuerystringDto extends ITid {}

export interface IPostCategoryBodyDto {
  /**
   * category name
   */
  name: ICategoryEntity['name'];
}
