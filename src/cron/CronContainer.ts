/* eslint-disable no-console, class-methods-use-this */
// import { CronError } from '#/cron/CronError';
import { ErrorController } from '@maeum/error-controller';
import { WinstonContainer } from '@maeum/logging-controller';
import { CronJob } from 'cron';
import { getRandomRangeInt, isError } from 'my-easy-fp';
import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';
import { TrackerAsyncResource } from './TrackerAsyncResource';

const log = WinstonContainer.l(__filename);

export class CronContainer {
  static #it: CronContainer;

  static get it(): Readonly<CronContainer> {
    return this.#it;
  }

  static #isBootstrap: boolean = false;

  static get isBootstrap(): Readonly<boolean> {
    return this.#isBootstrap;
  }

  static async bootstrap() {
    CronContainer.#it = new CronContainer();
    CronContainer.#isBootstrap = true;
    // CronContainer.#it.start();
  }

  #schedule: string;

  #job: CronJob<null, CronContainer>;

  #store: AsyncLocalStorage<{ tid: string }>;

  #start: boolean;

  #runOnInit: boolean;

  get job() {
    return this.#job;
  }

  constructor() {
    this.#store = new AsyncLocalStorage<{ tid: string }>();
    this.#schedule = '0/10 * * * * *';
    this.#start = false;
    this.#runOnInit = false;

    const handle = ErrorController.wrap(this.handle.bind(this));

    const withStore = () => {
      const tid = randomUUID();
      log.$(`start tid: ${tid}`);
      const store = { tid };

      this.#store.run(store, () => {
        try {
          const asyncResource = new TrackerAsyncResource(tid, undefined);
          asyncResource.runInAsyncScope(handle, this);
        } catch (caught) {
          const err = isError(caught, new Error('unknown error'));
          log.$(err.message, err.stack);
        }
      });
    };

    this.#job = new CronJob<null, CronContainer>(
      this.#schedule,
      withStore,
      null,
      this.#start,
      'Asia/Seoul',
      this,
      this.#runOnInit,
    );
  }

  start() {
    this.#job.start();
  }

  stop() {
    this.#job?.stop();
  }

  handle() {
    const random = getRandomRangeInt(1, 1000);
    const divider = 3;

    log.$(`[${random}, ${random % divider}]cron task start: `, new Date());

    // if (random % divider === 0) {
    //   throw new CronError(`divide by ${divider}, remain zero`);
    // }

    log.$(`[${random}, ${random % divider}]cron task end: `, new Date());
  }
}
