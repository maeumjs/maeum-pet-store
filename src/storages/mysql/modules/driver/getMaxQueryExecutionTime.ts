/** default limit of slow query */
const defaultMaxQueryExecutionTime = 500;

export default function getMaxQueryExecutionTime(env?: string | null): number {
  try {
    if (env == null) {
      return defaultMaxQueryExecutionTime;
    }

    const limit = Number.parseInt(env, 10);

    if (Number.isNaN(limit)) {
      return defaultMaxQueryExecutionTime;
    }

    return limit;
  } catch {
    return defaultMaxQueryExecutionTime;
  }
}
