import type { ICategoryEntity } from '#/database/interfaces/ICategoryEntity';

/**
 * CategoryDto of Pet, Store
 */
export interface ICategoryDto {
  /**
   * category id
   */
  id: ICategoryEntity['id'];

  /**
   * category name
   */
  name: ICategoryEntity['name'];
}
