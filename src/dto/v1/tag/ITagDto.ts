import type { ITag } from '#/database/interfaces/ITag';

/**
 * TagDto of Pet, Store
 */
export interface ITagDto {
  /**
   * category id
   */
  id: ITag['id'];

  /**
   * category name
   */
  name: ITag['name'];
}
