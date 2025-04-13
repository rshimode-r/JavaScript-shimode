// LF → CR+LF に変換する関数
export function convertLFToCRLF(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\n") {
      result += "\r\n";
    } else {
      result += str[i];
    }
  }
  return result;
}

// CR+LF → LF に変換する関数
export function convertCRLFToLF(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\r" && str[i + 1] === "\n") {
      result += "\n";
      i++;
    } else {
      result += str[i];
    }
  }
  return result;
}
