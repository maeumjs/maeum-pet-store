import { ReadonlyDeep } from 'type-fest';
import { DataSource, QueryRunner, ReplicationMode } from 'typeorm';

export default async function getQueryRunner<T>(
  ds: ReadonlyDeep<DataSource> | DataSource,
  mode: ReplicationMode,
  callabck: (qb: QueryRunner) => Promise<T>,
) {
  const runner = ds.createQueryRunner(mode);

  try {
    return await callabck(runner);
  } finally {
    await runner.release();
  }
}
