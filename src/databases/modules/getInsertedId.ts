import type { InsertResult } from 'typeorm';

/**
 * QueryBuilder으로 insert를 실행한 뒤 얻는 결과
 *
 * (기본 값) updateEntity를 true으로 설정하는 경우
 * identifiers, generatedMaps 필드에 값이 있다. 이 값을 inserted id로 사용 가능
 * ```json
 * InsertResult {
 *   identifiers: [ { id: 329 } ],
 *   generatedMaps: [ { id: 329, createdAt: 2024-01-31T06:46:24.000Z } ],
 *   raw: ResultSetHeader {
 *     fieldCount: 0,
 *     affectedRows: 1,
 *     insertId: 329,
 *     info: '',
 *     serverStatus: 3,
 *     warningStatus: 0,
 *     changedRows: 0
 *   }
 * }
 * ```
 *
 *
 * updateEntity를 false으로 설정하는 경우
 * identifiers, generatedMaps 필드에 값이 없다. raw에서 추출해야 한다
 * ```json
 * InsertResult {
 *   identifiers: [],
 *   generatedMaps: [],
 *   raw: ResultSetHeader {
 *     fieldCount: 0,
 *     affectedRows: 1,
 *     insertId: 330,
 *     info: '',
 *     serverStatus: 3,
 *     warningStatus: 0,
 *     changedRows: 0
 *   }
 * }
 * ```
 *
 * updateEntity를 false로 설정하고 여러 컬럼을 벌크 입력하는 경우
 * 아래와 같이 몇 개의 row가 insert 되었다고만 나오고 pk를 알수 없다.
 * 그래서 반드시 PK를 알아야 한다면 1개씩 insert를 해야하고, bulk로 insert를 하려면
 * hid와 같이 bulk insert를 한 뒤 조회할 수 있는 unique pk를 스스로 작성해야 한다
 *
 * ```json
 * InsertResult {
 *  identifiers: [],
 *  generatedMaps: [],
 *  raw: ResultSetHeader {
 *    fieldCount: 0,
 *    affectedRows: 3,
 *    insertId: 0,
 *    info: 'Records: 3  Duplicates: 0  Warnings: 0',
 *    serverStatus: 2,
 *    warningStatus: 0,
 *    changedRows: 0
 *  }
 * }
 * ```
 * @param result
 */
export function getInsertedId<T = string | number>(result: InsertResult): T | undefined {
  if (result.identifiers.length > 0) {
    const objectLiteral = result.identifiers.at(0);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const id = objectLiteral != null ? objectLiteral.id : undefined;

    if (id != null) {
      return id as T;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { insertId } = result.raw;
  if (insertId != null) {
    return insertId as T;
  }

  return undefined;
}

export function getInsertedIdOrThrow<T = string | number>(result: InsertResult, err?: Error): T {
  const insertedId = getInsertedId<T>(result);

  if (insertedId != null) {
    return insertedId;
  }

  if (err != null) {
    throw err;
  }

  throw new Error('Cannot get insertedId from InsertResult');
}
