export default function evaluateQuery(
  query: string,
  parameters: undefined | (string | string[])[],
): string {
  if (parameters == null || parameters.length <= 0) {
    return query;
  }

  return parameters.reduce<string>((evaluated, parameter) => {
    if (typeof parameter === 'object' && Array.isArray(parameter)) {
      return parameter.reduce<string>((nested, item) => {
        return nested.replace('?', item);
      }, evaluated);
    }

    return evaluated.replace('?', parameter);
  }, query);
}
