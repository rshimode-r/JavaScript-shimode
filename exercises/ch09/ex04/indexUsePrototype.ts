export interface IWarrior {
  atk: number;
  attack(): number;
}

export interface IMagicWarrior extends IWarrior {
  mgc: number;
}
// https://typescriptbook.jp/reference/functions/this-parameters
export function Warrior(this: IWarrior, atk: number) {
  if (isNaN(atk) || atk < 0) {
    throw new Error("atkは0以上の値のみサポートします");
  }
  this.atk = atk;
}

Warrior.prototype.attack = function () {
  return this.atk * 2;
};

export function MagicWarrior(this: IMagicWarrior, atk: number, mgc: number) {
  if (isNaN(mgc) || mgc < 0) {
    throw new Error("mgcは0以上の値のみサポートします");
  }
  //https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/call
  Warrior.call(this, atk);
  this.mgc = mgc;
}
// 継承
MagicWarrior.prototype = Object.create(Warrior.prototype);
// コンストラクタ関数を更新
MagicWarrior.prototype.constructor = MagicWarrior;

MagicWarrior.prototype.attack = function () {
  return Warrior.prototype.attack.call(this) + this.mgc;
};
