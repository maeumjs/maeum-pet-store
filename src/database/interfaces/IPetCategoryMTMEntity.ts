import type { IBaseEntity } from '#/database/interfaces/IBaseEntity';

export interface IPetCategoryMTMEntity {
  petId: IBaseEntity['id'];

  categoryId: IBaseEntity['id'];
}
