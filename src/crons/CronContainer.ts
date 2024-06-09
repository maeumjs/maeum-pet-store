/* eslint-disable no-console, class-methods-use-this */
import { container } from '#/modules/di/container';
import { wrap } from '@maeum/error-controller';
import { CE_DI as LOGGING_CONTROLLER } from '@maeum/logging-controller';
import { CronJob } from 'cron';
import { getRandomRangeInt, isError } from 'my-easy-fp';
import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';
import { TrackerAsyncResource } from './TrackerAsyncResource';

const log = container.resolve(LOGGING_CONTROLLER.MAEUM_LOGGERS).l(import.meta.filename);

export class CronContainer {
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

    const handle = wrap(container, this.handle.bind(this));

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
