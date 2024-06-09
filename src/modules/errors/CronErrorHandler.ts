/* eslint-disable class-methods-use-this */
import { CronError } from '#/crons/CronError';
import { container } from '#/modules/di/container';
import { ErrorHandler, getSourceLocation } from '@maeum/error-controller';
import { CE_DI as TOOLS, noop, safeStringify } from '@maeum/tools';
import { isError } from 'my-easy-fp';

export class CronErrorHandler extends ErrorHandler<CronError> {
  override isSelected(args: unknown): boolean {
    if (args instanceof CronError) {
      return true;
    }

    return false;
  }

  protected preHook = noop;

  protected postHook = noop;

  finalize(args: CronError, payload: string): void {
    console.log('cron-error-handler', args, payload);
  }

  stringify(data: unknown): string {
    return safeStringify(data);
  }

  protected serializor(args: unknown): {
    code: string;
    message?: string;
    info?: string | object;
  } {
    const encryptioner = container.resolve(TOOLS.ENCRYPTIONER);
    if (isError(args) != null && args instanceof CronError) {
      const err = args;
      const code = getSourceLocation(err);
      const message = this.getMessage(err, { message: err.message });
      const encrypted = this.option.encryption ? encryptioner.encrypt(code) : code;

      return { code: encrypted, message };
    }

    const err = new Error('unknown error raised');
    const code = getSourceLocation(err);
    const message = this.getMessage(err, { message: err.message });
    const encrypted = this.option.encryption ? encryptioner.encrypt(code) : code;

    return { code: encrypted, message };
  }
}
