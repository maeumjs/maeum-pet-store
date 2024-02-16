import type { IBaseEntity } from '#/databases/interfaces/IBaseEntity';

export interface IPetTagMTMEntity {
  petId: IBaseEntity['id'];

  tagId: IBaseEntity['id'];
}
