export function check31DaysMonthIfElse(month) {
  if (
    month === "Jan" ||
    month === "Mar" ||
    month === "May" ||
    month === "Jul" ||
    month === "Aug" ||
    month === "Oct" ||
    month === "Dec"
  )
    return true;
  else return false;
}

export function check31DaysMonthSwitch(month) {
  switch (month) {
    case "Jan":
    case "Mar":
    case "May":
    case "Jul":
    case "Aug":
    case "Oct":
    case "Dec":
      return true;
    default:
      return false;
  }
}
