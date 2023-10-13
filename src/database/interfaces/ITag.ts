import type { IBaseEntity } from '#/database/interfaces/IBaseEntity';

/**
 * Tag of Pet, Store
 */
export interface ITag {
  id: IBaseEntity['id'];

  /**
   * Tag name
   *
   * @maxLength 200
   * @minLength 3
   */
  name: string;
}
