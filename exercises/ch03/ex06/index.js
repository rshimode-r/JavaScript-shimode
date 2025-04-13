export function slice(str, indexStart, indexEnd = str.length) {
  // TODO: ここを実装しなさい
  if (indexStart !== Infinity)
    indexStart = isNaN(parseInt(indexStart)) ? 0 : parseInt(indexStart);
  if (indexEnd !== Infinity)
    indexEnd = isNaN(parseInt(indexEnd)) ? 0 : parseInt(indexEnd);
  if (indexStart < 0) indexStart = str.length + indexStart;
  if (indexEnd < 0) indexEnd = str.length + indexEnd;
  let result = "";
  for (
    let i = indexStart < 0 ? 0 : indexStart;
    i < indexEnd && i < str.length;
    i++
  )
    result += str[i];
  return result;
}
