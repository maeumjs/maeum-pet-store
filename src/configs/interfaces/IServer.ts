import { CE_RUN_MODE } from '#configs/const-enum/CE_RUN_MODE';

/**
 * Maeum Boilerplate Server Application configuration
 */
export default interface IServer {
  /** server run mode */
  runMode: CE_RUN_MODE;

  /** NODE_ENV */
  envMode: string;

  /** log level */
  logLevel: string;

  /** caller configuration, server name */
  caller: string;

  /** server port */
  port: number;
}
