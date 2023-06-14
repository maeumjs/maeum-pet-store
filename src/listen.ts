import { DBContainer } from '#/database/DBContainer';
import { ServerContainer } from '#/server/ServerContainer';
import { isError } from 'my-easy-fp';

const listen = async () => {
  await DBContainer.bootstrap();
  await ServerContainer.bootstrap();

  ServerContainer.it.listen();
};

listen().catch((caught) => {
  const err = isError(caught, new Error('unknown error raised'));
  console.error(err.message);
  console.error(err.stack);
});
