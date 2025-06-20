import { polarCoordinatObj } from "./index.ts";

// このテストはオブジェクトそのものを変更しているので、テストケース間で隔離されていない。
// コンストラクタ関数を作るのがもっともよい。
describe("polarCoordinatObj", () => {
  //各テストケースでrとthetaを初期化する
  beforeEach(() => {
    polarCoordinatObj.r = 0;
    polarCoordinatObj.theta = 0;
  });

  it("xとyの初期値は0である", () => {
    expect(polarCoordinatObj.x).toBeCloseTo(0);
    expect(polarCoordinatObj.y).toBeCloseTo(0);
  });

  it("xとyの値を設定した場合、rとthetaの値が更新される", () => {
    polarCoordinatObj.x = 3;
    polarCoordinatObj.y = 4;

    expect(polarCoordinatObj.r).toBeCloseTo(5);
    // Math.atan2 : 参照(https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)
    expect(polarCoordinatObj.theta).toBeCloseTo(Math.atan2(4, 3));
    expect(polarCoordinatObj.x).toBeCloseTo(3);
    expect(polarCoordinatObj.y).toBeCloseTo(4);
  });

  it("xとyの値を連続して設定した場合、rとthetaの値が更新される", () => {
    polarCoordinatObj.x = 6;
    polarCoordinatObj.y = 8;

    expect(polarCoordinatObj.r).toBeCloseTo(10);
    expect(polarCoordinatObj.theta).toBeCloseTo(Math.atan2(8, 6));
    expect(polarCoordinatObj.x).toBeCloseTo(6);
    expect(polarCoordinatObj.y).toBeCloseTo(8);

    polarCoordinatObj.y = 4;
    polarCoordinatObj.x = 3;

    expect(polarCoordinatObj.r).toBeCloseTo(5);
    expect(polarCoordinatObj.theta).toBeCloseTo(Math.atan2(4, 3));
    expect(polarCoordinatObj.x).toBeCloseTo(3);
    expect(polarCoordinatObj.y).toBeCloseTo(4);
  });

  it("xのみ値を設定した場合、rとthetaの値が更新される", () => {
    polarCoordinatObj.x = 4;

    expect(polarCoordinatObj.r).toBeCloseTo(4);
    expect(polarCoordinatObj.theta).toBeCloseTo(Math.atan2(0, 4));
    expect(polarCoordinatObj.x).toBeCloseTo(4);
    expect(polarCoordinatObj.y).toBeCloseTo(0);
  });

  it("yのみ値を設定した場合、rとthetaの値が更新される", () => {
    polarCoordinatObj.y = 4;

    expect(polarCoordinatObj.r).toBeCloseTo(4);
    expect(polarCoordinatObj.theta).toBeCloseTo(Math.atan2(4, 0));
    expect(polarCoordinatObj.x).toBeCloseTo(0);
    expect(polarCoordinatObj.y).toBeCloseTo(4);
  });

  it("xがNaNの場合、TypeErrorを返す", () => {
    expect(() => {
      polarCoordinatObj.x = NaN;
    }).toThrow(TypeError);
  });

  it("yがNaNの場合、TypeErrorを返す", () => {
    expect(() => {
      polarCoordinatObj.y = NaN;
    }).toThrow(TypeError);
  });
});
