export class IgnoreAccentPattern {
  constructor(pattern) {
    // パターンがRegExpか文字列か判定
    if (pattern instanceof RegExp) {
      this.flags = pattern.flags;
      this.source = pattern.source;
    } else {
      this.flags = ""; //文字列の場合、フラグは無し
      this.source = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); //エスケープシーケンス
    }
  }

  // 合成可能なダイアクリティカルマークは文字列を Unicode 正規化して分解し、 `\u0300-\u036f` の範囲を取り除くと除去
  normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  match(str) {
    const normalizedStr = this.normalize(str); //検索対象
    const normalizedPattern = this.normalize(this.source); //検索パターン
    return normalizedStr.match(new RegExp(normalizedPattern, this.flags));
  }

  search(str) {
    const normalizedStr = this.normalize(str); //検索対象
    const normalizedPattern = this.normalize(this.source); //検索パターン
    return normalizedStr.search(new RegExp(normalizedPattern, this.flags));
  }

  get [Symbol.match]() {
    return this.match;
  }

  get [Symbol.search]() {
    return this.search;
  }
}
