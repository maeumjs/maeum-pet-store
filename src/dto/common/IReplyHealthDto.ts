import type { IServer } from '#/configs/interfaces/IServer';

export interface IReplyHealthDto {
  envMode: IServer['envMode'];
  runMode: IServer['runMode'];
  port: IServer['port'];

  i18n: {
    language: string | string[];
  };
}
