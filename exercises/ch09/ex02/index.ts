export class C {
  #x = 0;
  get x() {
    return this.#x++;
  }
}
