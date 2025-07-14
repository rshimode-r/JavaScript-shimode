export function sequenceToObject(...values: any[]): Record<string, any> {
  if (values.length % 2 !== 0) {
    throw new Error("引数の数は偶数個必要です");
  }

  const result: Record<string, any> = {};

  for (let i = 0; i < values.length; i = i + 2) {
    const key = values[i];

    if (typeof key !== "string") {
      throw new Error("奇数番目の引数はstring型でなければなりません");
    }

    result[key] = values[i + 1];
  }

  return result;
}
