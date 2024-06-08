import type { IBaseEntity } from '#/databases/interfaces/IBaseEntity';
import type { IPetEntity } from '#/databases/interfaces/IPetEntity';

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

export interface ICategoryRelation {
  pet: IPetEntity[];
}
