export function instanceOf(object: object, constructor: Function): boolean {
  let proto = Object.getPrototypeOf(object);
  while (proto !== null) {
    if (proto === constructor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

//(追記)https://qiita.com/howdy39/items/35729490b024ca295d6c
