// 引数が複数なので括弧省略不可、複数処理があるため戻り値の中括弧省略不可
export const function1 = (n: number, c: string): string[] => {
  const resultArray = [];
  for (let i = 0; i < n; i++) {
    // console.count→XXX:count数　みたいな出力できる
    console.log(c);
    resultArray.push(c);
  }
  return resultArray;
};

// 引数が1つなので括弧省略可、戻り値は中括弧省略可
export const function2 = (x: number): number => x * x;

// 引数が0個なので括弧省略不可、戻り値も括弧省略不可(オブジェクトのため丸括弧)
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/now
export const function3 = (): { now: number } => ({ now: Date.now() });
