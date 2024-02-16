import { getQueryParameter } from '#/databases/logging/getQueryParameter';

export function getEvaluateQuery(query: string, parameters?: unknown[]) {
  const evaluateParameters = parameters?.map((parameter) => getQueryParameter(parameter));
  const evaluateQuery = evaluateParameters?.reduce<string>((evaluated, parameter) => {
    return evaluated.replace('?', parameter);
  }, query);
  return { query: evaluateQuery, parameters: evaluateParameters };
}
