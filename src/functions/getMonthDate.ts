import { DAYS_IN_MONTH, DAYS_IN_WEEK } from "../consts";

function isLeepYear(year: number): boolean {
  return !(year % 4 || (!(year % 100) && year % 400));
}

function getDayInMonth(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = DAYS_IN_MONTH[month];
  if (isLeepYear(year) && month === 1) {
    return daysInMonth + 1;
  }
  return daysInMonth;
}

function getDayOfWeek(date: Date): number {
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 0) {
    return 6;
  }
  return dayOfWeek - 1;
}

type MonthDateType = Date[][] | undefined[][];

export default function getMonthDate(year: number, month: number): MonthDateType {
  const result: MonthDateType = [];
  const date = new Date(year, month);
  const daysInMonth = getDayInMonth(date);
  const monthStartsOn = getDayOfWeek(date);
  let day = 1;

  for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
    result[i] = [];

    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
        result[i][j] = undefined;
      } else {
        result[i][j] = new Date(year, month, day++);
      }
    }
  }
  return result;
}
