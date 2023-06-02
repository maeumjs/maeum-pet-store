export default interface IArticleEntity {
  /**
   * title of article
   *
   * @minLength 2
   * @maxLength 512
   * */
  title: string;

  /**
   * content of article
   * @minLength 2
   * */
  content: string;
}
