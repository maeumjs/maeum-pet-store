import { ConfigContainer } from '#/configs/ConfigContainer';
import { DotenvContainer } from '#/configs/DotenvContainer';
import { ServerBootstrapOptions } from '#/configs/ServerBootstrapOptions';
import { ErrorController } from '@maeum/error-controller';
import { I18nController } from '@maeum/i18n-controller';
import { bootstrapWinston } from '@maeum/logging-controller';
import { SchemaController } from '@maeum/schema-controller';
import { EncryptContiner } from '@maeum/tools';

/**
 * 초기화 순서를 지켜주세요,
 *
 * ConfigContainer는 SchemaController를 사용합니다
 * EncryptContiner는 DotenvContainer를 사용합니다
 */
/* 01 */ DotenvContainer.bootstrap();
/* 02 */ SchemaController.bootstrap(false, ServerBootstrapOptions.schema);
/* 03 */ ConfigContainer.bootstrap();
/* 04 */ I18nController.bootstrap(false, ServerBootstrapOptions.i18n);
/* 05 */ bootstrapWinston(false, ServerBootstrapOptions.logger);
/* 06 */ ErrorController.bootstrap(ServerBootstrapOptions.errors);
/* 07 */ EncryptContiner.bootstrap({ key: process.env.ENV_ENCRYPTION_KEY });
