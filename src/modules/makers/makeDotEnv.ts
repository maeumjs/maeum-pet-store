import { getRunMode } from '#/configs/modules/getRunMode';
import { config } from 'dotenv';
import path from 'path';

export function makeDotEnv() {
  const runMode = getRunMode(process.env.RUN_MODE);
  const filename = path.join('resources', 'configs', `config.${runMode}.env`);

  // 여러 개의 env 파일을 읽으려면 여러 번 실행하세요
  config({ path: filename });
}
