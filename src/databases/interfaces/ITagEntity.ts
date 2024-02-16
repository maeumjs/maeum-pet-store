import type { IBaseEntity } from '#/databases/interfaces/IBaseEntity';

/**
 * Tag of Pet, Store
 */
export interface ITagEntity {
  id: IBaseEntity['id'];

  /**
   * Tag name
   *
   * @maxLength 200
   * @minLength 3
   */
  name: string;
}
