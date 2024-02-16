import type { ITagEntity } from '#/databases/interfaces/ITagEntity';
import type { ITid } from '#/dto/common/ITid';

export interface IDeleteTagQuerystringDto extends ITid {}

export interface IDeleteTagParamsDto {
  /**
   * tag id
   */
  id: ITagEntity['id'];
}
