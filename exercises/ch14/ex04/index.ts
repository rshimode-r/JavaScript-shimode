export class HiraganaChar {
  private _char: string;
  private _code: number;

  constructor(char: string) {
    //https://historia.co.jp/archives/32255/
    if (!/^[\u3040-\u309F]$/.test(char)) {
      throw new Error("1文字のひらがなのみ受け付けます。");
    }
    this._char = char;
    this._code = char.charCodeAt(0);
  }
  get char(): string {
    return this._char;
  }

  get code(): number {
    return this._code;
  }

  //https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive
  [Symbol.toPrimitive](hint: string): string | number {
    if (hint === "number") {
      return this._code;
    } else {
      return this._char;
    }
  }
}
