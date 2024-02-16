import type { ICategoryEntity } from '#/databases/interfaces/ICategoryEntity';
import type { ICategoryDto } from '#/dto/v1/category/ICategoryDto';

export function fromEntity(entity: ICategoryEntity): ICategoryDto {
  return {
    id: entity.id,
    name: entity.name,
  };
}
