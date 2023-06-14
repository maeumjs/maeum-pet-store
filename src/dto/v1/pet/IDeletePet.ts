import type { IPet } from '#/database/interfaces/IPet';
import type { ITid } from '#/dto/common/ITid';

export interface IDeletePetQuerystringDto extends ITid {}

export interface IDeletePetParamsDto {
  /**
   * category id
   */
  id: IPet['id'];
}
