import type { IBaseEntity } from '#/database/interfaces/IBaseEntity';

/**
 * Category of Pet, Store
 */
export interface ICategoryEntity {
  id: IBaseEntity['id'];

  /**
   * Category name
   *
   * @maxLength 200
   * @minLength 2
   * @pattern ^[a-zA-Z0-9_-]+$
   */
  name: string;
}
