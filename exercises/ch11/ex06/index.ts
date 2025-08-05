export function isEmailAddress(input: any): boolean {
  if (typeof input !== "string") return false;

  const atCount = (input.match(/@/g) || []).length;

  // @が1個だけでなければfalse
  if (atCount != 1) return false;

  const atIndex = input.indexOf("@");
  const local = input.substring(0, atIndex);
  const domain = input.substring(atIndex + 1);

  // 長さチェック
  if (local.length > 64 || domain.length > 252) return false;
  //メモ `+`は1回以上繰り返し。後半`.xxxx`が0回以上あること
  const allowedDotAtomPattern =
    /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+(\.[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+)*$/;

  if (!allowedDotAtomPattern.test(local)) return false;
  if (!allowedDotAtomPattern.test(domain)) return false;
  return true;
}
