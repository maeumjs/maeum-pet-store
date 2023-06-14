import { CE_RUN_MODE } from '#/configs/const-enum/CE_RUN_MODE';

export function getRunMode(envRunMode?: string): CE_RUN_MODE {
  switch (envRunMode) {
    case CE_RUN_MODE.LOCAL:
    case CE_RUN_MODE.DEVELOP:
    case CE_RUN_MODE.QA:
    case CE_RUN_MODE.STAGE:
    case CE_RUN_MODE.PRODUCTION:
      return envRunMode;
    default:
      return CE_RUN_MODE.LOCAL;
  }
}
