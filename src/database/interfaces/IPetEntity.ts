import type { CE_ENTITY_NAME } from '#/database/const-enum/CE_ENTITY_NAME';
import type { IBaseEntity } from '#/database/interfaces/IBaseEntity';
import type { ICategoryEntity } from '#/database/interfaces/ICategoryEntity';
import type { ITagEntity } from '#/database/interfaces/ITagEntity';
import type { CE_PET_STATUS } from '#/database/interfaces/const-enum/CE_PET_STATUS';

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

export interface IPetEntityRelations {
  [CE_ENTITY_NAME.CATEGORY]: ICategoryEntity[];
  [CE_ENTITY_NAME.TAG]: ITagEntity[];
}
