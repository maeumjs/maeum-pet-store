import type { executionAsyncId } from 'node:async_hooks';
import type { randomUUID } from 'node:crypto';
import type { IncomingHttpHeaders } from 'node:http';

export interface IAsyncStore {
  tid: ReturnType<typeof randomUUID>;
  lang: IncomingHttpHeaders['accept-language'];
  type: string;
  triggerAsyncId: ReturnType<typeof executionAsyncId>;
}
