import type { IBaseEntity } from '#/database/interfaces/IBaseEntity';

/**
 * Tag of Pet, Store
 */
export interface ITag extends IBaseEntity {
  /**
   * Tag name
   *
   * @maxLength 200
   * @minLength 3
   */
  name: string;
}
