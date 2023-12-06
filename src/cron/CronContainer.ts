/* eslint-disable no-console, class-methods-use-this */
import { CronError } from '#/cron/CronError';
import { ErrorController } from '@maeum/error-controller';
import { WinstonContainer } from '@maeum/logging-controller';
import { CronJob } from 'cron';
import { getRandomRangeInt } from 'my-easy-fp';

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
    CronContainer.#it.start();
  }

  #schedule = '0/30 * * * * *';

  #job: CronJob<null, CronContainer> | undefined = undefined;

  #start: boolean = false;

  #runOnInit: boolean = false;

  get job() {
    return this.#job;
  }

  start() {
    const handle = ErrorController.wrap(this.handle.bind(this));
    this.#job = new CronJob<null, CronContainer>(
      this.#schedule,
      handle,
      null,
      this.#start,
      'Asia/Seoul',
      this,
      this.#runOnInit,
    );
  }

  stop() {
    this.#job?.stop();
  }

  handle() {
    const random = getRandomRangeInt(1, 1000);
    const divider = 3;

    log.$(`[${random}, ${random % divider}]cron task start: `, new Date());

    if (random % divider === 0) {
      throw new CronError(`divide by ${divider}, remain zero`);
    }

    log.$(`[${random}, ${random % divider}]cron task end: `, new Date());
  }
}
