import type { ITagEntity } from '#/databases/interfaces/ITagEntity';
import type { ITid } from '#/dto/common/ITid';

export interface IGetTagQuerystringDto extends ITid {}

export interface IGetTagParamsDto {
  /**
   * tag id
   */
  id: ITagEntity['id'];
}
