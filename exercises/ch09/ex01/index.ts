export class C {
  static method() {
    return 1;
  }

  method() {
    return 2;
  }

  static C = class {
    static method() {
      return 3;
    }
    method() {
      return 4;
    }
  };
  //((new C()).C).method()
  C = class {
    static method() {
      return 5;
    }
    //(new (new C().C)()).method()
    method() {
      return 6;
    }
  };
}
