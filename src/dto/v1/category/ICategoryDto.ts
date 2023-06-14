import type { ICategory } from '#/database/interfaces/ICategory';

/**
 * CategoryDto of Pet, Store
 */
export interface ICategoryDto {
  /**
   * category id
   */
  id: ICategory['id'];

  /**
   * category name
   */
  name: ICategory['name'];
}
