import type { IPetEntity } from '#/databases/interfaces/IPetEntity';
import type { ITid } from '#/dto/common/ITid';

export interface IGetPetQuerystringDto extends ITid {}

export interface IGetPetParamsDto {
  id: IPetEntity['id'];
}
