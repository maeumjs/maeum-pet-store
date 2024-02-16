import { executionAsyncResource } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

export function getAsyncTid(): string {
  const acquiredExecutionAsyncResource = executionAsyncResource() as {
    [key: string | symbol]: unknown;
  };
  const keys = Reflect.ownKeys(acquiredExecutionAsyncResource);
  const resource = keys
    .map((key) => acquiredExecutionAsyncResource[key])
    .find((element): element is { tid: string } => typeof element === 'object' && element != null);

  if (resource?.tid == null) {
    return `unde${randomUUID().substring(4)}`;
  }

  return resource.tid;
}
