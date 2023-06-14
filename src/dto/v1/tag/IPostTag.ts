import type { ITag } from '#/database/interfaces/ITag';
import type { ITid } from '#/dto/common/ITid';

export interface IPostTagQuerystringDto extends ITid {}

export interface IPostTagBodyDto {
  /**
   * category name
   */
  name: ITag['name'];
}
