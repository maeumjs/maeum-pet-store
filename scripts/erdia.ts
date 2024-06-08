import { building, CE_ENTITY_VERSION_FROM, CE_OUTPUT_COMPONENT, CE_PROJECT_NAME_FROM } from 'erdia';
import { isError } from 'my-easy-fp';

export async function handle() {
  console.log('Start erdia');

  await building(
    {
      config: '',
      dataSourcePath: 'src/databases/data-sources/PetStoreMysqlDataSource.ts',
      format: 'html',
      output: 'dist/html',
      components: [CE_OUTPUT_COMPONENT.TABLE, CE_OUTPUT_COMPONENT.ER],
      projectName: CE_PROJECT_NAME_FROM.APPLICATION,
      versionFrom: CE_ENTITY_VERSION_FROM.PACKAGE_JSON,
      theme: 'dark',
    },
    true,
  );
}

handle().catch((caught) => {
  const err = isError(caught, new Error('unknown error raised'));
  console.log(err.message);
  console.log(err.stack);
});
