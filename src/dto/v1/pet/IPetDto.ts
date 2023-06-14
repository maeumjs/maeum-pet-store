import type { IPet } from '#/database/interfaces/IPet';
import type { ICategoryDto } from '#/dto/v1/category/ICategoryDto';
import type { ITagDto } from '#/dto/v1/tag/ITagDto';

export interface IPetDto {
  /**
   * pet id
   *
   * format에서 int64 형식이 생성이 안된다, 추가 포맷으로 해도 안됨, github 뒤져봐야 한다
   *
   * @asType integer
   * @foramt int64
   */
  id: IPet['id'];

  /**
   * pet name
   */
  name: IPet['name'];

  category?: ICategoryDto[];

  tag?: ITagDto[];
}
