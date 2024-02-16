import type { CE_ENTITY_NAME } from '#/databases/const-enum/CE_ENTITY_NAME';
import type { IBaseEntity } from '#/databases/interfaces/IBaseEntity';
import type { ICategoryEntity } from '#/databases/interfaces/ICategoryEntity';
import type { ITagEntity } from '#/databases/interfaces/ITagEntity';
import type { CE_PET_STATUS } from '#/databases/interfaces/const-enum/CE_PET_STATUS';

export interface IPetEntity {
  id: IBaseEntity['id'];

  /**
   * Pet name
   *
   * @maxLength 200
   * @minLength 2
   */
  name: string;

  status: CE_PET_STATUS;
}

export interface IPetRelation {
  [CE_ENTITY_NAME.CATEGORY]: ICategoryEntity[];
  [CE_ENTITY_NAME.TAG]: ITagEntity[];
}
