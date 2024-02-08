import { DBContainer } from '#/database/DBContainer';
import { CE_DATASORUCE_NAME } from '#/database/const-enum/CE_DATASORUCE_NAME';
import { CE_IMAGE_REFERENCE_ENTITY } from '#/database/const-enum/CE_IMAGE_REFERENCE_ENTITY';
import { ImageEntity } from '#/database/entities/ImageEntity';
import type {
  IPostUploadImagePetBodyMultipartDto,
  IPostUploadImagePetParamDto,
  IPostUploadImagePetQuerystringDto,
} from '#/dto/v1/pet/IPostUploadImagePet';
import { read as readPet } from '#/repository/pet';

export async function create(
  querystring: IPostUploadImagePetQuerystringDto,
  params: IPostUploadImagePetParamDto,
  body: IPostUploadImagePetBodyMultipartDto,
  source: string,
  hash: string,
) {
  const pet = await readPet(querystring, { id: params.id });

  if (pet == null) {
    throw new Error(`Cannot found pet: ${params.id}`);
  }

  const imageRepository = DBContainer.it
    .ds(CE_DATASORUCE_NAME.PET_STORE)
    .getRepository(ImageEntity);

  const image = await imageRepository.save({
    refId: pet.id,
    metadata: body.additionalMetadata,
    entity: CE_IMAGE_REFERENCE_ENTITY.PET,
    source,
    hash,
  });

  return image;
}
