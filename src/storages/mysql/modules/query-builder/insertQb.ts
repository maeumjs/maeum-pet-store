import { ReadonlyDeep } from 'type-fest';
import type { DataSource, EntityManager, EntityTarget, ObjectLiteral, QueryRunner } from 'typeorm';

export default function insertQb<T extends ObjectLiteral>(
  source: ReadonlyDeep<DataSource> | DataSource | EntityManager,
  target: EntityTarget<T>,
  queryRunner: QueryRunner,
  tid?: string,
) {
  if (tid != null) {
    return source
      .getRepository(target)
      .createQueryBuilder(undefined, queryRunner)
      .insert()
      .into(target)
      .updateEntity(false)
      .comment(tid);
  }

  return source
    .getRepository(target)
    .createQueryBuilder(undefined, queryRunner)
    .insert()
    .into(target)
    .updateEntity(false);
}
