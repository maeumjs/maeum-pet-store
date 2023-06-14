import type { IBaseEntity } from '#/database/interfaces/IBaseEntity';

export interface IPetTagMTM {
  petId: IBaseEntity['id'];

  tagId: IBaseEntity['id'];
}
