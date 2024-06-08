import { getAsyncStore } from '#/modules/logging/store/getAsyncStore';
import { randomUUID } from 'node:crypto';

export function getAsyncTid(): string {
  const store = getAsyncStore();

  if (store?.tid == null) {
    return `unde${randomUUID().substring(4)}`;
  }

  return store.tid;
}
