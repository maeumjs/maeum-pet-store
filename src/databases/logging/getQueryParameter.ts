import { quoting } from '#/databases/logging/quoting';
import { safeStringify } from '@maeum/tools';
import { lightFormat } from 'date-fns';

export function getQueryParameter(parameter: unknown): string {
  switch (typeof parameter) {
    case 'string':
      return quoting(parameter);
    case 'bigint':
      return `${parameter}`;
    case 'boolean':
    case 'number':
      return `${parameter}`;
    case 'object':
      if (parameter instanceof Date) {
        return quoting(lightFormat(parameter, 'yyyy-MM-dd HH:mm:ss.SSS'));
      }
      if (
        parameter != null &&
        'toSqlString' in parameter &&
        typeof parameter.toSqlString === 'function'
      ) {
        return parameter.toSqlString() as string;
      }
      return safeStringify(parameter);
    default:
      return safeStringify(parameter);
  }
}
