export function getAllProperties(obj: object): (string | symbol)[] {
  if (obj == null || typeof obj !== "object") return [];

  // 独自プロパティ（列挙不可能なものやSymbolもここで取得）
  const ownProps: (string | symbol)[] = [
    ...Object.getOwnPropertyNames(obj),
    ...Object.getOwnPropertySymbols(obj),
  ];

  // 継承プロパティ（列挙可能なもの）
  const protoProps: string[] = [];
  for (const key in obj) {
    if (!ownProps.includes(key)) {
      protoProps.push(key);
    }
  }

  return [...ownProps, ...protoProps];
}
