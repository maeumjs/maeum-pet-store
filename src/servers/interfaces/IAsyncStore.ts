import type { executionAsyncId } from 'async_hooks';
import type { randomUUID } from 'crypto';
import type { IncomingHttpHeaders } from 'http';

export interface IAsyncStore {
  tid: ReturnType<typeof randomUUID>;
  lang: IncomingHttpHeaders['accept-language'];
  type: string;
  triggerAsyncId: ReturnType<typeof executionAsyncId>;
}
