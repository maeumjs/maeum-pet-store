import type { IBaseEntity } from '#/database/interfaces/IBaseEntity';

export interface IPetCategoryMTM {
  petId: IBaseEntity['id'];

  categoryId: IBaseEntity['id'];
}
