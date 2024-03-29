import { CronContainer } from '#/cron/CronContainer';
import { DBContainer } from '#/databases/DBContainer';
import { ServerContainer } from '#/servers/ServerContainer';
import { isError } from 'my-easy-fp';

const listen = async () => {
  await DBContainer.bootstrap();
  await ServerContainer.bootstrap();
  await CronContainer.bootstrap();

  ServerContainer.it.listen();
};

listen().catch((caught) => {
  const err = isError(caught, new Error('unknown error raised'));
  console.error(err.message);
  console.error(err.stack);
});
