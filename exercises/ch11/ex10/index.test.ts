import {
  countWeekdays,
  getDaysInMonth,
  getFirstDayOfLastMonth,
  getWeekdayName,
} from "./index.ts";

describe("getDaysInMonth", () => {
  it("2025年1月は31日", () => {
    expect(getDaysInMonth(2025, 1)).toBe(31);
  });

  it("2025年4月は30日", () => {
    expect(getDaysInMonth(2025, 4)).toBe(30);
  });

  it("2023年2月は28日", () => {
    expect(getDaysInMonth(2023, 2)).toBe(28);
  });

  it("2024年2月（うるう年）は29日", () => {
    expect(getDaysInMonth(2024, 2)).toBe(29);
  });

  it("対応範囲外の年を指定した場合はエラーになる", () => {
    expect(() => getDaysInMonth(1800, 1)).toThrow(Error);
  });

  it("対応範囲外の月（13月）を指定した場合はエラーになること", () => {
    expect(() => getDaysInMonth(2024, 13)).toThrow(Error);
  });
});

describe("countWeekdays", () => {
  it("2025-08-04 〜 2025-08-08 は5日間の平日がある", () => {
    expect(countWeekdays("2025-08-04", "2025-08-08")).toBe(5);
  });

  it("2025-08-03（日）〜2025-08-04（月）は1日間の平日がある", () => {
    expect(countWeekdays("2025-08-03", "2025-08-04")).toBe(1);
  });

  it("2025-08-02（土）〜2025-08-03（日）は平日が0日である", () => {
    expect(countWeekdays("2025-08-02", "2025-08-03")).toBe(0);
  });

  it("開始日と終了日が同じで平日の場合は1を返す", () => {
    expect(countWeekdays("2025-08-05", "2025-08-05")).toBe(1);
  });

  it("開始日が終了日より後なら0を返す", () => {
    expect(countWeekdays("2025-08-10", "2025-08-01")).toBe(0);
  });

  it("日付フォーマットが不正ならエラーを投げること", () => {
    expect(() => countWeekdays("2025/08/01", "2025-08-10")).toThrow(Error);
  });
});

describe("getWeekdayName", () => {
  it("2025-08-07 ,ja-JP は 木曜日 を返す", () => {
    expect(getWeekdayName("2025-08-07", "ja-JP")).toBe("木曜日");
  });

  it("2025-08-07 ,en-US は Thursday を返すこと", () => {
    expect(getWeekdayName("2025-08-07", "en-US")).toBe("Thursday");
  });

  it("日付形式が不正な場合はエラーを投げること", () => {
    expect(() => getWeekdayName("2025/08/07", "ja-JP")).toThrow(Error);
  });

  it("存在しない日付はエラーを投げること", () => {
    expect(() => getWeekdayName("2025-13-01", "ja-JP")).toThrow(Error);
  });
});

describe("getFirstDayOfLastMonth", () => {
  it("返り値は今より前の月の1日である", () => {
    const result = getFirstDayOfLastMonth();

    const now = new Date();
    const expectedMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;

    expect(result.getFullYear()).toBeLessThanOrEqual(now.getFullYear()); //1月の時は年をまたぐ
    expect(result.getMonth()).toBe(expectedMonth);
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });
});
