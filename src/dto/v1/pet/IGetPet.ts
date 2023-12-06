import type { IPetEntity } from '#/database/interfaces/IPetEntity';
import type { ITid } from '#/dto/common/ITid';

export interface IGetPetQuerystringDto extends ITid {}

export interface IGetPetParamsDto {
  id: IPetEntity['id'];
}
