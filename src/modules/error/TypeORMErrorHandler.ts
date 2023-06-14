/* eslint-disable class-methods-use-this */
import { DefaultErrorHandler } from '@maeum/error-controller';
import { TypeORMError } from 'typeorm';

export class TypeORMErrorHandler extends DefaultErrorHandler {
  override isSelected(err: Error): boolean {
    if (err instanceof TypeORMError) {
      return true;
    }

    return false;
  }
}
