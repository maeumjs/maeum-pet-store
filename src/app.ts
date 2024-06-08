import { makeCron } from '#/modules/makers/makeCron';
import { makePetDataSoruce } from '#/modules/makers/makePetDataSoruce';
import { makeServer } from '#/modules/makers/makeServer';
import { listen } from '#/servers/listen';
import { isError } from 'my-easy-fp';

async function app() {
  makeCron();
  await makeServer();
  await makePetDataSoruce();

  // container.resolve(CE_DI.CRON).start();

  listen();
}

app().catch((caught) => {
  const err = isError(caught, new Error('unknown error raised'));
  console.error(err.message);
  console.error(err.stack);
});
