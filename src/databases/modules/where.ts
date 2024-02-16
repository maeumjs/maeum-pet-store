import type { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export function where<T extends ObjectLiteral>(): (
  kind?: 'or' | 'and',
) => keyof Pick<SelectQueryBuilder<T>, 'where' | 'andWhere' | 'orWhere'> {
  const clause: WeakRef<(keyof Pick<SelectQueryBuilder<T>, 'where' | 'andWhere' | 'orWhere'>)[]> =
    new WeakRef(['where']);

  return (kind?: 'or' | 'and') => {
    const current = clause.deref()?.shift();

    if (current != null) {
      return current;
    }

    if (kind === 'or') {
      return 'orWhere';
    }

    return 'andWhere';
  };
}
