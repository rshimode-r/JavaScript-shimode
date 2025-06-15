export function reverse(str: string): string {
  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  const result = [];
  for (const x of segmenter.segment(str)) result.unshift(x.segment);

  return result.join("");
}
// 参照 : https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/segment
