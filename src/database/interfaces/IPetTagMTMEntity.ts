import type { IBaseEntity } from '#/database/interfaces/IBaseEntity';

export interface IPetTagMTMEntity {
  petId: IBaseEntity['id'];

  tagId: IBaseEntity['id'];
}
