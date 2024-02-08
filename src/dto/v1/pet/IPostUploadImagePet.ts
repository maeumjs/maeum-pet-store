import type { IImageEntity } from '#/database/interfaces/IImageEntity';
import type { IPetEntity } from '#/database/interfaces/IPetEntity';
import type { ITid } from '#/dto/common/ITid';
import type { TFileUpload } from '#/dto/common/TFileUpload';
import type { MultipartFile } from '@fastify/multipart';

export interface IPostUploadImagePetQuerystringDto extends ITid {}

export interface IPostUploadImagePetParamDto {
  id: IPetEntity['id'];
}

export interface IPostUploadImagePetBodyDto {
  additionalMetadata: IImageEntity['metadata'];

  file: TFileUpload;
}

/**
 * @nozzleIgnore
 */
export interface IPostUploadImagePetBodyMultipartDto {
  additionalMetadata: IImageEntity['metadata'];

  file: TFileUpload;

  $file: MultipartFile;
}
