export function sortJapanese(arr: string[]): string[] {
  const collator = new Intl.Collator("ja", {
    sensitivity: "base", //文字列中の大文字・小文字・半濁点の違いを無視
    usage: "sort",
  }).compare;

  return arr.sort(collator);
}

export function toJapaneseDateString(date: Date): string {
  const formatted = new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
    era: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/replace
  return formatted.replace(
    /^(\D+)(\d+)\/(\d+)\/(\d+)$/,
    (_, era, year, month, day) => {
      return `${era}${year}年${month}月${day}日`;
    }
  );
}
