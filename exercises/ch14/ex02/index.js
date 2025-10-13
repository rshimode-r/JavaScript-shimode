export class MyArrayLike {
  // TODO
  constructor(length) {
    this.length = length;
  }
}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  // TODO
  static get [Symbol.species]() {
    return MyArrayLike;
  }
}
