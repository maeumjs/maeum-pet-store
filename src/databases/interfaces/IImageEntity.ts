import type { CE_IMAGE_REFERENCE_ENTITY } from '#/databases/const-enum/CE_IMAGE_REFERENCE_ENTITY';
import type { IBaseEntity } from '#/databases/interfaces/IBaseEntity';

/**
 * Image of Pet, Store
 */
export interface IImageEntity {
  id: IBaseEntity['id'];

  /**
   * reference entity id
   */
  refId: IBaseEntity['id'];

  /**
   * entity name
   *
   * @maxLength 200
   * @minLength 3
   */
  entity: CE_IMAGE_REFERENCE_ENTITY;

  /**
   * additional metadata for image and entity
   *
   * @maxLength 2000
   */
  metadata?: string;

  /**
   * hash filename to prevent duplicate filenames
   *
   * @maxLength 512
   * */
  hash: string;

  /**
   * the filename at the time of upload
   *
   * @maxLength 1000
   * @minLength 2
   * */
  source: string;
}
