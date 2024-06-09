import { container } from '#/modules/di/container';
import {
  HTTPErrorHandler,
  getSourceLocation,
  type THTTPErrorHandlerParameters,
} from '@maeum/error-controller';
import { CE_DI as TOOLS } from '@maeum/tools';
import { isError } from 'my-easy-fp';
import { QueryFailedError, TypeORMError } from 'typeorm';

export class TypeORMErrorHandler extends HTTPErrorHandler {
  /* eslint-disable-next-line class-methods-use-this */
  override isSelected(args: THTTPErrorHandlerParameters): boolean {
    if (args.err instanceof TypeORMError) {
      return true;
    }

    return false;
  }

  protected serializor(args: THTTPErrorHandlerParameters): {
    code: string;
    message?: string;
    info?: string | object;
  } {
    const encryptioner = container.resolve(TOOLS.ENCRYPTIONER);
    if (isError(args.err) != null && args.err instanceof QueryFailedError) {
      const code = getSourceLocation(args.err);
      const message = this.getMessage(args, { message: args.err.message });
      const encrypted = this.option.encryption ? encryptioner.encrypt(code) : code;

      const info = this.option.encryption
        ? encryptioner.encrypt(
            JSON.stringify({ sql: args.err.query, params: args.err.parameters }, undefined, 2),
          )
        : { sql: args.err.query, params: args.err.parameters };

      return { code: encrypted, message, info };
    }

    const code = getSourceLocation(args.err);
    const message = this.getMessage(args, { message: args.err.message });
    const encrypted = this.option.encryption ? encryptioner.encrypt(code) : code;

    return { code: encrypted, message };
  }
}
