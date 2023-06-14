import type { IBaseEntity } from '#/database/interfaces/IBaseEntity';

/**
 * Category of Pet, Store
 */
export interface ICategory extends IBaseEntity {
  /**
   * Category name
   *
   * @maxLength 200
   * @minLength 3
   */
  name: string;
}
