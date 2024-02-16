import type { ITagEntity } from '#/databases/interfaces/ITagEntity';
import type { ITagDto } from '#/dto/v1/tag/ITagDto';

export function fromEntity(entity: ITagEntity): ITagDto {
  return {
    id: entity.id,
    name: entity.name,
  };
}
