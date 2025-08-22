export function getDaysInMonth(year: number, month: number): number {
  if (year < 1900 || year > 2025 || month < 1 || month > 12)
    throw new Error("サポート外の年月が入力されました。");
  //(罠)Data APIは月は0月からスタートし日付は1日からスタートする。
  //0日は先月の最終日
  return new Date(year, month, 0).getDate();
}

export function countWeekdays(
  startDateStr: string,
  endDateStr: string
): number {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(startDateStr) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(endDateStr)
  )
    throw new Error("期間の開始日と終了日はYYYY-MM-DD'形式でお願いします。");
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (startDate > endDate) return 0; // 開始日が終了日より後なら0

  let count = 0;
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const day = currentDate.getDay();
    // 日曜日(0)と土曜日(6)以外をカウント(参考)https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
    if (day !== 0 && day !== 6) {
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
}

export function getWeekdayName(dateStr: string, locale: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr))
    throw new Error("日付はYYYY-MM-DD形式でお願いします。");

  const date = new Date(dateStr);
  //getTimeは無効な値ならNaNを返す
  if (isNaN(date.getTime())) {
    throw new Error("有効な日付を指定してください。");
  }
  //(参考)https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  return date.toLocaleDateString(locale, { weekday: "long" });
}

export function getFirstDayOfLastMonth(): Date {
  const now = new Date();
  const oneDayMs = 24 * 60 * 60 * 1000;

  //なんでsetDateで(0)を入れなかったのだろうか...→そのあと日付などを調整
  // 今月 1 日 0 時 0 分 0 秒
  const firstDayOfThisMonthTime =
    now.getTime() - (now.getDate() - 1) * oneDayMs; //今月の1日にする
  const firstDayOfThisMonth = new Date(firstDayOfThisMonthTime);
  firstDayOfThisMonth.setHours(0, 0, 0, 0);

  // 今月1日の1日前 → 先月末日
  const lastDayOfPrevMonthTime = firstDayOfThisMonth.getTime() - oneDayMs;
  const lastDayOfPrevMonth = new Date(lastDayOfPrevMonthTime);
  lastDayOfPrevMonth.setHours(0, 0, 0, 0);

  // 先月 1 日 0 時 0 分 0 秒（今月 1 日 0 時 0 分 0 秒と同じやり方）
  const firstDayOfLastMonthTime =
    lastDayOfPrevMonthTime - (lastDayOfPrevMonth.getDate() - 1) * oneDayMs;
  const firstDayOfLastMonth = new Date(firstDayOfLastMonthTime);
  firstDayOfLastMonth.setHours(0, 0, 0, 0);

  return firstDayOfLastMonth;
}
