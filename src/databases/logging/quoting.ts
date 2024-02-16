export function quoting(parameter: string, quote?: string): string {
  const quoteChar = quote ?? "'";
  return `${quoteChar}${parameter}${quoteChar}`;
}
