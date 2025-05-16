export function ConvertEscapeUseIfElse(stringValue) {
  let result = "";
  for (let c of stringValue) {
    if (c === "\0") {
      result += "\\0";
    } else if (c === "\b") {
      result += "\\b";
    } else if (c === "\t") {
      result += "\\t";
    } else if (c === "\n") {
      result += "\\n";
    } else if (c === "\v") {
      result += "\\v";
    } else if (c === "\f") {
      result += "\\f";
    } else if (c === "\r") {
      result += "\\r";
    } else if (c === "\\") {
      result += "\\\\";
    } else if (c === '"') {
      result += '\\"';
    } else if (c === "'") {
      result += "\\'";
    } else {
      result += c;
    }
  }
  return result;
}

export function ConvertEscapeUseSwitch(stringValue) {
  let result = "";
  for (let c of stringValue) {
    switch (c) {
      case "\0":
        result += "\\0";
        break;
      case "\b":
        result += "\\b";
        break;
      case "\t":
        result += "\\t";
        break;
      case "\n":
        result += "\\n";
        break;
      case "\v":
        result += "\\v";
        break;
      case "\f":
        result += "\\f";
        break;
      case "\r":
        result += "\\r";
        break;
      case '"':
        result += '\\"';
        break;
      case "'":
        result += "\\'";
        break;
      default:
        result += c;
    }
  }
  return result;
}
