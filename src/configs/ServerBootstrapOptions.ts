import routeMap from '#/handlers/route-map';
import { CronErrorHandler } from '#/modules/error/CronErrorHandler';
import { TypeORMErrorHandler } from '#/modules/error/TypeORMErrorHandler';
import type { IErrorControllerOption } from '@maeum/error-controller';
import { I18nController, pt, ptu, type II18nControllerOption } from '@maeum/i18n-controller';
import { getRoutePathKey, type IWinstonLoggingControllerOption } from '@maeum/logging-controller';
import type { ISchemaControllerBootstrapOption } from '@maeum/schema-controller';
import { getCwd } from '@maeum/tools';
import ajvFormat from 'ajv-formats';
import path from 'node:path';
import { getRunMode } from './modules/getRunMode';

export const ServerBootstrapOptions = {
  schema: {
    filePath: path.join(getCwd(process.env), 'resources', 'configs', 'store.json'),
    ajv: {
      options: {
        coerceTypes: 'array',
        keywords: ['collectionFormat', 'example', 'binary'],
        formats: {
          binary: { type: 'string', validate: () => true },
          byte: { type: 'string', validate: () => true },
          int64: { type: 'number', validate: () => true },
        },
      },
      extension: (ajv) => {
        ajvFormat(ajv);
      },
    },
    stringify: {
      useAjv: true,
      useNative: true,
    },
  } satisfies ISchemaControllerBootstrapOption,
  i18n: {
    localeRoot: path.join(getCwd(process.env), 'resources', 'locales'),
    defaultLanguage: 'en',
  } satisfies II18nControllerOption,
  logger: {
    winston: {
      develop: () =>
        getRunMode(process.env.RUN_MODE) !== 'production' &&
        getRunMode(process.env.RUN_MODE) !== 'stage',
    },
    request: {
      isReplyPayloadLogging: true,
      includes: new Map<string, boolean>(
        Array.from(routeMap.values())
          .map((routeInfo) => Array.from(routeInfo.values()))
          .flat()
          .map((routeInfo) => [getRoutePathKey(routeInfo), true]),
      ),
    },
  } satisfies IWinstonLoggingControllerOption,
  errors: {
    encryption: true,
    translate: (language, option) => ptu({ headers: { 'accept-language': language } }, option),
    fallbackMessage: () => pt('en', 'common.main.error'),
    includeDefaultHandler: true,
    handlers: [
      new TypeORMErrorHandler({
        encryption: true,
        getLanguage: (args) =>
          I18nController.it.getLanguageFromRequestHeader(args.req.headers['accept-language']),
        translate: (language, option) => ptu({ headers: { 'accept-language': language } }, option),
        fallbackMessage: () => pt('en', 'common.main.error'),
      }),
      new CronErrorHandler({
        encryption: true,
        getLanguage: () => 'en',
        translate: (language, option) => ptu({ headers: { 'accept-language': language } }, option),
        fallbackMessage: () => pt('en', 'common.main.error'),
      }),
    ],
  } satisfies IErrorControllerOption,
};
