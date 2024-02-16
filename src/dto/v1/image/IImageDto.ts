import type { IImageEntity } from '#/databases/interfaces/IImageEntity';

/**
 * CategoryDto of Pet, Store
 */
export interface IImageDto {
  id: IImageEntity['id'];
  refId: IImageEntity['refId'];
  metadata: IImageEntity['metadata'];
  hash: IImageEntity['hash'];
  source: IImageEntity['source'];
}
