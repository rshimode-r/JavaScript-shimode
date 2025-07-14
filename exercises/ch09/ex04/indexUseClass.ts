export class Warrior {
  atk: number;
  constructor(atk: number) {
    if (isNaN(atk) || atk < 0) {
      throw new Error("atkは0以上の値のみサポートします");
    }
    this.atk = atk;
  }
  attack() {
    return this.atk * 2;
  }
}

export class MagicWarrior extends Warrior {
  mgc: number;
  constructor(atk: number, mgc: number) {
    if (isNaN(mgc) || mgc < 0) {
      throw new Error("mgcは0以上の値のみサポートします");
    }
    super(atk);
    this.mgc = mgc;
  }
  attack() {
    return super.attack() + this.mgc;
  }
}
