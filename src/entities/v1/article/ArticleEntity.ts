import { BaseEntityColumns } from '#entities/common/BaseEntity';
import { CreatedAtEntityColumns } from '#entities/common/CreatedAtEntity';
import { UpdatedAtEntityColumns } from '#entities/common/UpdatedAtEntity';
import { CE_TABLE_NAMES } from '#entities/common/const-enum/CE_TABLE_NAMES';
import IBaseEntity from '#entities/common/interfaces/IBaseEntity';
import ICreatedAtEntity from '#entities/common/interfaces/ICreatedAtEntity';
import IUpdatedAtEntity from '#entities/common/interfaces/IUpdatedAtEntity';
import IArticleEntity from '#entities/v1/article/interfaces/IArticleEntity';
import { EntitySchema } from 'typeorm';

const ArticleEntity = new EntitySchema<
  IArticleEntity & IBaseEntity & ICreatedAtEntity & IUpdatedAtEntity
>({
  name: CE_TABLE_NAMES.ARTICLE,
  columns: {
    ...BaseEntityColumns,
    title: {
      type: 'varchar',
      name: 'title',
      comment: 'title of article',
    },
    content: {
      type: 'varchar',
      name: 'content',
      comment: 'content of article',
      nullable: false,
    },
    ...CreatedAtEntityColumns,
    ...UpdatedAtEntityColumns,
  },
  embeddeds: {},
});

export default ArticleEntity;
