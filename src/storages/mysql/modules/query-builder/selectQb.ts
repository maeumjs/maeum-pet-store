import { ReadonlyDeep } from 'type-fest';
import type { DataSource, EntityManager, EntityTarget, ObjectLiteral, QueryRunner } from 'typeorm';

export default function selectQb<T extends ObjectLiteral>(
  source: ReadonlyDeep<DataSource> | DataSource | EntityManager,
  target: EntityTarget<T>,
  runner: QueryRunner,
  alias: string,
  tid?: string,
) {
  if (tid != null) {
    return source.getRepository(target).createQueryBuilder(alias, runner).select().comment(tid);
  }

  return source.getRepository(target).createQueryBuilder(alias, runner).select();
}
