import evaluateParameter from '#storages/mysql/loggers/modules/evaluateParameter';
import evaluateQuery from '#storages/mysql/loggers/modules/evaluateQuery';
import escapeSafeStringify from '#tools/misc/escapeSafeStringify';

export default function getQueryAndParameters(query: string, parameters?: unknown[]) {
  const evaluatedParameters = parameters?.map((parameter) => {
    if (typeof parameter === 'object' && parameter != null && Array.isArray(parameter)) {
      return parameter.map((item) => evaluateParameter(item));
    }

    return evaluateParameter(parameter);
  });

  const evaluatedQuery = escapeSafeStringify(evaluateQuery(query, evaluatedParameters));

  return { parameters: evaluatedParameters, query: evaluatedQuery };
}
