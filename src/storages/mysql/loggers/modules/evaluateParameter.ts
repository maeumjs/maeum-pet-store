import escapeSafeStringify from '#tools/misc/escapeSafeStringify';
import dayjs from 'dayjs';

export default function evaluateParameter(parameter: unknown): string {
  try {
    if (parameter == null) {
      return '';
    }

    // Date object convert to SQL format string
    if (parameter instanceof Date) {
      return `${dayjs(parameter).format('YYYY-MM-DD HH:mm:ss.SSS Z')}`;
    }

    if (
      typeof parameter === 'object' &&
      'toSqlString' in parameter &&
      typeof parameter.toSqlString === 'function'
    ) {
      return parameter.toSqlString() as string;
    }

    if (typeof parameter === 'boolean') {
      return parameter ? 'true' : 'false';
    }

    if (typeof parameter === 'number') {
      return `${parameter}`;
    }

    return `'${escapeSafeStringify(parameter)}'`;
  } catch {
    return '';
  }
}
