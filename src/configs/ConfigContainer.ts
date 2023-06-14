import type { IConfiguration } from '#/configs/interfaces/IConfiguration';
import { getRunMode } from '#/configs/modules/getRunMode';
import { SchemaController } from '@maeum/schema-controller';
import { getCwd } from '@maeum/tools';
import { parse } from 'jsonc-parser';
import { isFalse } from 'my-easy-fp';
import fs from 'node:fs';
import path from 'node:path';

export class ConfigContainer {
  static #it: ConfigContainer;

  static get it(): Readonly<ConfigContainer> {
    return this.#it;
  }

  static #isBootstrap: boolean = false;

  static get isBootstrap(): Readonly<boolean> {
    return this.#isBootstrap;
  }

  static bootstrap() {
    const dirname = path.join(getCwd(process.env), 'resources', 'configs');
    const runMode = getRunMode(process.env.RUN_MODE);
    const filename = `config.${runMode}.json`;
    const configBuf = fs.readFileSync(path.join(dirname, filename));
    const parsed = parse(configBuf.toString()) as IConfiguration;

    const validator = SchemaController.it.getValidator('IConfiguration');
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

    ConfigContainer.#it = new ConfigContainer(parsed);
    ConfigContainer.#isBootstrap = true;

    return ConfigContainer.#it;
  }

  #config: IConfiguration;

  constructor(config: IConfiguration) {
    this.#config = config;
  }

  get config(): Readonly<IConfiguration> {
    return this.#config;
  }

  getPort(): number {
    const envPort = process.env.PORT ?? '';
    const parsed = parseInt(envPort, 10);

    if (!Number.isNaN(parsed) && this.#config.server.port !== parsed) {
      this.#config.server.port = parsed;
      return parsed;
    }

    return this.#config.server.port;
  }
}

export function cfg() {
  return ConfigContainer.it.config;
}
