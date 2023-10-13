import type { CE_ENTITY_NAME } from '#/database/const-enum/CE_ENTITY_NAME';
import type { IBaseEntity } from '#/database/interfaces/IBaseEntity';
import type { ICategory } from '#/database/interfaces/ICategory';
import type { ITag } from '#/database/interfaces/ITag';
import type { CE_PET_STATUS } from '#/database/interfaces/const-enum/CE_PET_STATUS';

export interface IPet {
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

export interface IPetRelations {
  [CE_ENTITY_NAME.CATEGORY]: ICategory[];
  [CE_ENTITY_NAME.TAG]: ITag[];
}
