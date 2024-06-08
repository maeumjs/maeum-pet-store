import { getServerBootstrapOptions } from '#/configs/ServerBootstrapOptions';
import { container } from '#/modules/di/container';
import { makeConfig } from '#/modules/makers/makeConfig';
import { makeDotEnv } from '#/modules/makers/makeDotEnv';
import { makePackageJson } from '#/modules/makers/makePackageJson';
import { makeErrorController } from '@maeum/error-controller';
import { makeSyncI18nContainer } from '@maeum/i18n-controller';
import { makeSyncLoggers } from '@maeum/logging-controller';
import { makeSyncSchemaController } from '@maeum/schema-controller';
import { makeEncryptioner } from '@maeum/tools';

/**
 * 초기화 순서를 지켜주세요,
 *
 * ConfigContainer는 SchemaController를 사용합니다
 * EncryptContiner는 DotenvContainer를 사용합니다
 */
/* 01 */ makeDotEnv();
const options = getServerBootstrapOptions(container);
/* 02 */ makeSyncSchemaController(container, options.schema);
/* 03 */ makeConfig();
/* 04 */ makeSyncI18nContainer(container, options.i18n);
/* 05 */ makeSyncLoggers(container, 'winston', options.loggers);
/* 06 */ makeErrorController(container, options.errors);
/* 07 */ makeEncryptioner(container, { key: process.env.ENV_ENCRYPTION_KEY });
/* 08 */ makePackageJson();
