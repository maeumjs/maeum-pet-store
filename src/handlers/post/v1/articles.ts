/* eslint-disable no-console */
import {
  IReqCreateArticleBody,
  IReqCreateArticleQuerystring,
} from '#dto/v1/articles/IReqCreateArticle';
import ArticleRepository from '#repositories/v1/articles/ArticleRepository';
import { maeumRestErrorSchema } from '@maeum/error-handler';
import { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['articles'],
    summary: 'create articles',
    description: 'create articles',
    operationId: 'create-articles',
    querystring: { $ref: 'IReqCreateArticleQuerystring' },
    body: { $ref: 'IReqCreateArticleBody' },
    response: {
      400: maeumRestErrorSchema,
      500: maeumRestErrorSchema,
    },
  },
};

export default async function createArticleHandler(
  req: FastifyRequest<{ Querystring: IReqCreateArticleQuerystring; Body: IReqCreateArticleBody }>,
) {
  const article = await ArticleRepository.create(
    {
      title: req.body.title,
      content: req.body.content,
    },
    req.query.tid,
  );

  return article;
}
