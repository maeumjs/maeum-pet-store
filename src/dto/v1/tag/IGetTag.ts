import type { ITag } from '#/database/interfaces/ITag';
import type { ITid } from '#/dto/common/ITid';

export interface IGetTagQuerystringDto extends ITid {}

export interface IGetTagParamsDto {
  /**
   * tag id
   */
  id: ITag['id'];
}
