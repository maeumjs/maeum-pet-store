import { CE_TABLE_NAMES } from '#entities/common/const-enum/CE_TABLE_NAMES';
import ArticleEntity from '#entities/v1/article/ArticleEntity';
import IArticleEntity from '#entities/v1/article/interfaces/IArticleEntity';
import createOid from '#modules/v1/common/createOid';
import getQueryRunner from '#storages/mysql/modules/query-builder/getQueryRunner';
import insertQb from '#storages/mysql/modules/query-builder/insertQb';
import selectQb from '#storages/mysql/modules/query-builder/selectQb';
import mysql from '#storages/mysql/mysql';

async function createArticles(article: IArticleEntity, tid: string) {
  return getQueryRunner(mysql.cmsApi, 'master', async (qr) => {
    const oid = createOid();
    const iqb = insertQb(mysql.cmsApi, ArticleEntity, qr, tid);
    iqb.values([{ ...article, oid }]);

    await iqb.execute();

    const sqb = selectQb(mysql.cmsApi, ArticleEntity, qr, CE_TABLE_NAMES.ARTICLE_ALIAS, tid);
    sqb.where(`${CE_TABLE_NAMES.ARTICLE_ALIAS}.oid = :oid`, { oid });
    const inserted = await sqb.getOneOrFail();

    return inserted;
  });
}

const ArticleRepository = {
  create: createArticles,
};

export default ArticleRepository;
