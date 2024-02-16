import type { ITagEntity } from '#/databases/interfaces/ITagEntity';
import type { ITid } from '#/dto/common/ITid';

export interface IPutTagQuerystringDto extends ITid {}

export interface IPutTagParamsDto {
  id: ITagEntity['id'];
}

export interface IPutTagBodyDto {
  name: ITagEntity['name'];
}
