import type { IBaseEntity } from '#/databases/interfaces/IBaseEntity';

export interface IPetCategoryMTMEntity {
  petId: IBaseEntity['id'];

  categoryId: IBaseEntity['id'];
}
