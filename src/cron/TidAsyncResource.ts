import { AsyncResource } from 'async_hooks';

export class TidAsyncResource extends AsyncResource {
  #tid: string;

  constructor(tid: string) {
    super('tid-async-resource');

    this.#tid = tid;
  }

  get tid(): Readonly<string> {
    return this.#tid;
  }
}
