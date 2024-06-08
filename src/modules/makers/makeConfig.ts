import type { IConfiguration } from '#/configs/interfaces/IConfiguration';
import { getRunMode } from '#/configs/modules/getRunMode';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { CE_DI as SCHEMA_CONTROLLER } from '@maeum/schema-controller';
import { getCwd } from '@maeum/tools';
import type { ValidateFunction } from 'ajv';
import { parse } from 'jsonc-parser';
import { isFalse } from 'my-easy-fp';
import fs from 'node:fs';
import path from 'node:path';

export function makeConfig() {
  const ajvContainer = container.resolve(SCHEMA_CONTROLLER.AJV);
  const dirname = path.join(getCwd(process.env), 'resources', 'configs');
  const runMode = getRunMode(process.env.RUN_MODE);
  const filename = `config.${runMode}.json`;
  const configBuf = fs.readFileSync(path.join(dirname, filename));
  const parsed = parse(configBuf.toString()) as IConfiguration;
  const validator = ajvContainer.getValidatorOrThrow(
    'IConfiguration',
  ) as ValidateFunction<IConfiguration>;
  const validationResult = validator(parsed);

  if (isFalse(validationResult)) {
    throw new Error(
      `Error occured from, configuration file reading, \n${
        validator.errors
          ?.map((error) => `${error.instancePath}:${error.message ?? 'unknown error'}`)
          ?.join('\n') ?? ''
      }`,
    );
  }

  container.register(CE_DI.CONFIG, parsed);
}
