const obj1 = { x: 1 };
// 問題: ここに1行コードを書くことで以下の行で {x: 1, y: 2} が出力されること
obj1.y = 2;
console.log(obj1);

const obj2 = { x: 1, y: 2 };
// 問題: 以下の行では何が出力されるか、予想してから結果を確認しなさい
// 予想: 同じオブジェクトを比較していないためfalse
console.log(obj1 === obj2);

export function equals(o1, o2) {
  if (o1 === o2) return true;
  if (
    o1 === null ||
    o2 === null ||
    typeof o1 != "object" ||
    typeof o2 != "object"
  ) {
    return false;
  }
  const o1Keys = Object.keys(o1);
  const o2Keys = Object.keys(o2);
  if (o1Keys.length != o2Keys.length) return false;
  for (let key of o1Keys) {
    if (!o2Keys.includes(key)) return false;
    if (o1[key] != o2[key]) return false;
  }
  return true;
}
