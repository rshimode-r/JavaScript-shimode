export function stringifyJSON(json) {
  if (json === null) {
    return "null";
  }

  const type = typeof json;

  if (type === "number" || type === "boolean") {
    return String(json);
  }

  if (type === "string") {
    return `"${json
      .replace(/\\/g, "\\\\") // \ →\\
      .replace(/"/g, '\\"') // " → \"
      .replace(new RegExp(String.fromCharCode(8), "g"), "\\b") // \b → \\b (String.fromCharCode(8)は\bに対応)
      .replace(/\f/g, "\\f") // \f → \\f
      .replace(/\n/g, "\\n") // \n → \\n
      .replace(/\r/g, "\\r") // \r → \\r
      .replace(/\t/g, "\\t") // \t → \\t
      .replace(
        // eslint-disable-next-line no-control-regex
        /[\u0000-\u001F]/g,
        (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0") // \u0000 → \\u0000
      )}"`;
  }

  // if (type === "object")より先に記述する必要あり
  if (Array.isArray(json)) {
    const elements = json.map((item) => stringifyJSON(item));
    return `[${elements.join(",")}]`;
  }

  if (type === "object") {
    const keys = Object.keys(json);
    const props = keys.map((key) => {
      const val = stringifyJSON(json[key]);
      return stringifyJSON(key) + ":" + val;
    });
    return `{${props.join(",")}}`;
  }
}
