import { CronContainer } from '#/crons/CronContainer';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';

export function makeCron() {
  const cron = new CronContainer();
  container.register(CE_DI.CRON, cron);
}
