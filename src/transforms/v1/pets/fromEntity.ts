import type { IPetEntity, IPetRelation } from '#/databases/interfaces/IPetEntity';
import type { IPetDto } from '#/dto/v1/pet/IPetDto';
import { fromEntity as transformCategoryFromEntity } from '#/transforms/v1/categories/fromEntity';
import { fromEntity as transformTagFromEntity } from '#/transforms/v1/tags/fromEntity';

export function fromEntity(entity: IPetEntity & IPetRelation): IPetDto {
  return {
    id: entity.id,
    name: entity.name,
    category: entity.category.map((category) => transformCategoryFromEntity(category)),
    tag: entity.tag.map((tag) => transformTagFromEntity(tag)),
  };
}
