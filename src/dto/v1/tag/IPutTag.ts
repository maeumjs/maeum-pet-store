import type { ITag } from '#/database/interfaces/ITag';
import type { ITid } from '#/dto/common/ITid';

export interface IPutTagQuerystringDto extends ITid {}

export interface IPutTagParamsDto {
  id: ITag['id'];
}

export interface IPutTagBodyDto {
  name: ITag['name'];
}
