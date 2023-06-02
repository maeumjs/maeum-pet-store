export const CE_TABLE_NAMES = {
  ARTICLE: 'tbl_article',
  ARTICLE_ALIAS: 'taa',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/naming-convention
export type CE_TABLE_NAMES = (typeof CE_TABLE_NAMES)[keyof typeof CE_TABLE_NAMES];
