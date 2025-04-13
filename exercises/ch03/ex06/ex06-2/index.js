export function substring(str, indexStart, indexEnd = str.length) {
  // TODO: ここを実装しなさい
  if (indexStart !== Infinity)
    indexStart =
      isNaN(parseInt(indexStart)) || indexStart < 0 ? 0 : parseInt(indexStart);
  if (indexEnd !== Infinity)
    indexEnd =
      isNaN(parseInt(indexEnd)) || indexEnd < 0 ? 0 : parseInt(indexEnd);
  if (indexStart > indexEnd) {
    const tmp = indexStart;
    indexStart = indexEnd;
    indexEnd = tmp;
  }
  let result = "";
  for (let i = indexStart; i < indexEnd && i < str.length; i++)
    result += str[i];
  return result;
}

//リファクタ中
// export function substring(str, indexStart, indexEnd = str.length) {
//   // TODO: ここを実装しなさい
//   //TODO:
//   if (indexEnd === Infinity) indexEnd = 0;
//   // indexStartがindexEndより大きかったら入れ替える
//   if (indexStart > indexEnd) {
//     const tmp = indexStart;
//     indexStart = indexEnd;
//     indexEnd = tmp;
//   }
//   let result = "";
//   if (indexStart < 0) indexStart = 0;
//   if (indexStart >= str.length) return "";
//   if (indexEnd > str.length) indexEnd = str.length;
//   for (let i = indexStart; i < indexEnd; i++) {
//     result += str[i];
//   }
//   return result;
// }

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

export function padStart(str, targetLength, padString = " ") {
  // TODO: ここを実装しなさい

  const addPadding = targetLength - str.length;
  let result = "";
  for (let i = 0; i < addPadding; i++)
    result += padString[i % padString.length];
  result += str;
  return result;
}

export function trim(str) {
  // TODO: ここを実装しなさい
  let indexStart;
  let indexEnd;
  for (let i = 0; i < str.length && str[i] === " "; i++) indexStart = i + 1;
  for (let i = str.length - 1; i > 0 && str[i] === " "; i--) indexEnd = i;
  return slice(str, indexStart, indexEnd);
}
