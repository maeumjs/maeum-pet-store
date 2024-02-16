import type { IPetEntity } from '#/databases/interfaces/IPetEntity';
import type { ITid } from '#/dto/common/ITid';

export interface IDeletePetQuerystringDto extends ITid {}

export interface IDeletePetParamsDto {
  /**
   * category id
   */
  id: IPetEntity['id'];
}
