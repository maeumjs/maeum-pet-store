import type { ITagEntity } from '#/databases/interfaces/ITagEntity';
import type { ITid } from '#/dto/common/ITid';

export interface IPostTagQuerystringDto extends ITid {}

export interface IPostTagBodyDto {
  /**
   * category name
   */
  name: ITagEntity['name'];
}
