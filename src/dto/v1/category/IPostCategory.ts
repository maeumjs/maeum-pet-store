import type { ICategoryEntity } from '#/databases/interfaces/ICategoryEntity';
import type { ITid } from '#/dto/common/ITid';

export interface IPostCategoryQuerystringDto extends ITid {}

export interface IPostCategoryBodyDto {
  name: ICategoryEntity['name'];
}
