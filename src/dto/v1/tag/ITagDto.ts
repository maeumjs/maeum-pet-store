import type { ITagEntity } from '#/database/interfaces/ITagEntity';

/**
 * TagDto of Pet, Store
 */
export interface ITagDto {
  /**
   * category id
   */
  id: ITagEntity['id'];

  /**
   * category name
   */
  name: ITagEntity['name'];
}
