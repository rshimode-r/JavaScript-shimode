let ricoh = ["r", "i", "c", "o", "h"];
console.log("削除前 : " + ricoh.length);
delete ricoh[3];
console.log("削除後 : " + ricoh.length);
console.log(ricoh);

// 削除前 : 5
// 削除後 : 5
// [ 'r', 'i', 'c', <1 empty item>, 'h' ]
//文字列と連結させるとr,i,c,,h
