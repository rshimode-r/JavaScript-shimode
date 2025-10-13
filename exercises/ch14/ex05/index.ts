export function showTypes(
  strings: TemplateStringsArray, //https://zenn.dev/nekoniki/articles/bdf79a512e057ae72613
  ...values: unknown[]//変数部分
): string {
  return strings
    .map((str, i) => str + (i < values.length ? getTypeName(values[i]) : ""))
    .join("");
}

function getTypeName(value: unknown): string {
  // nullもarrayもObjectになってしまうので
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}
