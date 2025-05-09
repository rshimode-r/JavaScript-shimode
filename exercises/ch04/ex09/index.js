//予想
// undefined → undefined
// null → object
// オブジェクト → object
// NaN → NaN
// 数値 → number
// 関数 → function

console.log("undefiend: " + typeof undefined);
console.log("null: " + typeof null);
console.log("オブジェクト: " + typeof { x: 1, y: 2 });
console.log("NaM: " + typeof NaN);
console.log("数値: " + typeof 831);
console.log(
  "関数: " +
    typeof (() => {
      return 0;
    })
);

//結果
// undefiend: undefined
// undefiend: object
// undefiend: object
// undefiend: number
// undefiend: number
// undefiend: function
