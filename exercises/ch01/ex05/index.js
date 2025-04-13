// abs関数の実装
export function abs(x) {
    if(x >= 0){
        return x;
    }
    else {
        return -x;
    }
  }
  
  // sum関数の実装
  export function sum(array) {
    let sum = 0;
    for (let x of array){
        sum += x;
    }
    return sum;
  }
  
  // factorial関数の実装
  export function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) return NaN; //0と正の整数以外はNaNを返す
    let product = 1;
    while(n>1){
        product *= n;
        n--;
    }
    return product;
  }