import type { ITag } from '#/database/interfaces/ITag';
import type { ITid } from '#/dto/common/ITid';

export interface IDeleteTagQuerystringDto extends ITid {}

export interface IDeleteTagParamsDto {
  /**
   * tag id
   */
  id: ITag['id'];
}
