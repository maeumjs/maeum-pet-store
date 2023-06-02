import ITid from '#dto/common/ITid';
import IArticleEntity from '#entities/v1/article/interfaces/IArticleEntity';

export interface IReqCreateArticleQuerystring extends ITid {}

export interface IReqCreateArticleBody {
  title: IArticleEntity['title'];
  content: IArticleEntity['content'];
}
