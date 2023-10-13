/* eslint-disable class-methods-use-this */
import { DefaultErrorHandler, getSourceLocation } from '@maeum/error-controller';
import { EncryptContiner } from '@maeum/tools';
import type { ErrorObject } from 'ajv';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { isError } from 'my-easy-fp';
import { QueryFailedError, TypeORMError } from 'typeorm';

export class TypeORMErrorHandler extends DefaultErrorHandler {
  override isSelected(err: Error): boolean {
    if (err instanceof TypeORMError) {
      return true;
    }

    return false;
  }

  protected serializor(
    err: Error & { validation?: ErrorObject[] },
    req: FastifyRequest,
    _reply: FastifyReply,
  ): { code: string; message?: string; info?: string | object } {
    if (isError(err) != null && err instanceof QueryFailedError) {
      const code = getSourceLocation(err);
      const message = this.getMessage(req, { message: err.message });
      const encrypted =
        this.option.encryption && EncryptContiner.isBootstrap
          ? EncryptContiner.it.encrypt(code)
          : code;

      const info =
        this.option.encryption && EncryptContiner.isBootstrap
          ? EncryptContiner.it.encrypt(
              JSON.stringify({ sql: err.query, params: err.parameters }, undefined, 2),
            )
          : { sql: err.query, params: err.parameters };

      return { code: encrypted, message, info };
    }

    const code = getSourceLocation(err);
    const message = this.getMessage(req, { message: err.message });
    const encrypted =
      this.option.encryption && EncryptContiner.isBootstrap
        ? EncryptContiner.it.encrypt(code)
        : code;

    return { code: encrypted, message };
  }
}
