export function isEmailAddress(input: any): boolean {
  if (typeof input !== "string") return false;
  // []はnullでもエラー出ないように
  const atCount = (input.match(/@/g) || []).length;

  // @が1個だけでなければfalse
  if (atCount != 1) return false;

  const atIndex = input.indexOf("@");
  const local = input.substring(0, atIndex);
  const domain = input.substring(atIndex + 1);

  // 長さチェック（全体の長さチェックが必要→今のでもテストを通過してしまう254とか）
  if (local.length > 64 || domain.length > 252) return false;
  //メモ `+`は1回以上繰り返し。後半`.xxxx`が0回以上あること
  const allowedDotAtomPattern =
    /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+(\.[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+)*$/;

  if (!allowedDotAtomPattern.test(local)) return false;
  if (!allowedDotAtomPattern.test(domain)) return false;
  return true;
}
// RegExpはregular Expressionの略
