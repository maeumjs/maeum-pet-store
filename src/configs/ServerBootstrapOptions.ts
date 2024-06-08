import { CE_RUN_MODE } from '#/configs/const-enum/CE_RUN_MODE';
import routeMap from '#/handlers/route-map';
import { CronErrorHandler } from '#/modules/error/CronErrorHandler';
import { TypeORMErrorHandler } from '#/modules/error/TypeORMErrorHandler';
import type { IErrorControllerOption } from '@maeum/error-controller';
import {
  CE_DI as I18N_CONTROLLER,
  type II18nContainerOptions,
  type II18nParameters,
} from '@maeum/i18n-controller';
import {
  CE_LOGGING_ACTION_CODE,
  getRoutePathKey,
  makeWinstonConsoleTransport,
  makeWinstonFileTransport,
  type IMaeumSyncLoggersWithWinstonOptions,
} from '@maeum/logging-controller';
import type { ISchemaControllerBootstrapOption } from '@maeum/schema-controller';
import { getCwd, type IClassContainer } from '@maeum/tools';
import ajvFormat from 'ajv-formats';
import path from 'node:path';
import { getRunMode } from './modules/getRunMode';

export function getServerBootstrapOptions(container: IClassContainer) {
  const runMode = getRunMode(process.env.RUN_MODE);

  const schema: ISchemaControllerBootstrapOption = {
    filePath: path.join(getCwd(process.env), 'resources', 'configs', 'store.json'),
    ajv: {
      options: {
        coerceTypes: 'array',
        keywords: ['collectionFormat', 'example', 'binary'],
        formats: {
          binary: {
            type: 'string',
            validate: () => {
              return true;
            },
          },
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
  };

  const i18n: II18nContainerOptions = {
    localeRoot: path.join(getCwd(process.env), 'resources', 'locales'),
    defaultLanguage: 'en',
  };

  const defaultLoggerName = 'api';
  const loggers: IMaeumSyncLoggersWithWinstonOptions = {
    winston: {
      getEnableDebugMessage: () =>
        getRunMode(process.env.RUN_MODE) !== 'production' &&
        getRunMode(process.env.RUN_MODE) !== 'stage',
      defaultAppName: defaultLoggerName,
      options: (() => {
        switch (runMode) {
          case CE_RUN_MODE.DEVELOP:
          case CE_RUN_MODE.QA:
            return new Map([
              [
                defaultLoggerName,
                { getOptions: () => ({ transports: [makeWinstonConsoleTransport()] }) },
              ],
            ]);
          // production
          case CE_RUN_MODE.STAGE:
          case CE_RUN_MODE.PRODUCTION:
            return new Map([
              [
                defaultLoggerName,
                { getOptions: () => ({ transports: [makeWinstonFileTransport()] }) },
              ],
            ]);
          // local
          default:
            return new Map([
              [
                defaultLoggerName,
                { getOptions: () => ({ transports: [makeWinstonFileTransport()] }) },
              ],
            ]);
        }
      })(),
    },
    request: {
      isReplyPayloadLogging: true,
      contents: {
        default: {
          reply: {
            headers: CE_LOGGING_ACTION_CODE.COMPRESS,
            payload: CE_LOGGING_ACTION_CODE.COMPRESS,
          },
        },
      },
      includes: new Map<string, boolean>(
        Array.from(routeMap.values())
          .map((routeInfo) => Array.from(routeInfo.values()))
          .flat()
          .map((routeInfo) => [getRoutePathKey(routeInfo), true]),
      ),
    },
    curl: {
      curl: {
        prettify: false,
        excludeHeaders: [
          'sec-ch-ua',
          'sec-ch-ua-mobile',
          'sec-ch-ua-platform',
          'sec-fetch-site',
          'sec-fetch-mode',
          'sec-fetch-dest',
        ],
      },
    },
  };

  const errors: IErrorControllerOption = {
    encryption: (() => {
      switch (runMode) {
        case CE_RUN_MODE.DEVELOP:
        case CE_RUN_MODE.QA:
          return false;
        // production
        case CE_RUN_MODE.STAGE:
        case CE_RUN_MODE.PRODUCTION:
          return true;
        // local
        default:
          return false;
      }
    })(),
    translate: (language, option) => {
      const i18nContainer = container.resolve(I18N_CONTROLLER.I18N_CONTROLLER);
      return i18nContainer.ptu(
        { headers: { 'accept-language': language } },
        option as II18nParameters,
      );
    },
    fallbackMessage: () => {
      const i18nContainer = container.resolve(I18N_CONTROLLER.I18N_CONTROLLER);
      return i18nContainer.pt('en', 'common.main.error');
    },
    includeDefaultHandler: true,
    handlers: [
      new TypeORMErrorHandler(container, {
        encryption: true,
        getLanguage: (args) => {
          const i18nContainer = container.resolve(I18N_CONTROLLER.I18N_CONTROLLER);
          return i18nContainer.getLanguageFromRequestHeader(args.req.headers['accept-language']);
        },
        translate: (language, option) => {
          const i18nContainer = container.resolve(I18N_CONTROLLER.I18N_CONTROLLER);
          return i18nContainer.ptu(
            { headers: { 'accept-language': language } },
            option as II18nParameters,
          );
        },
        fallbackMessage: () => {
          const i18nContainer = container.resolve(I18N_CONTROLLER.I18N_CONTROLLER);
          return i18nContainer.pt('en', 'common.main.error');
        },
      }),
      new CronErrorHandler(container, {
        encryption: true,
        getLanguage: () => 'en',
        translate: (language, option) => {
          const i18nContainer = container.resolve(I18N_CONTROLLER.I18N_CONTROLLER);
          return i18nContainer.ptu(
            { headers: { 'accept-language': language } },
            option as II18nParameters,
          );
        },
        fallbackMessage: () => {
          const i18nContainer = container.resolve(I18N_CONTROLLER.I18N_CONTROLLER);
          return i18nContainer.pt('en', 'common.main.error');
        },
      }),
    ],
  };

  return {
    schema,
    i18n,
    loggers,
    errors,
  };
}
