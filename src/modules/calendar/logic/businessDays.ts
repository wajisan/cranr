import { eachDay, fromKey, toKey } from './dateRange';
import { isHoliday } from './frenchHolidays';

export function isWeekend(key: string): boolean {
  const day = fromKey(key).getDay();
  return day === 0 || day === 6;
}

export function isBusinessDay(key: string): boolean {
  return !isWeekend(key) && !isHoliday(key);
}

export function countBusinessDays(start: string, end: string): number {
  return eachDay(start, end).filter(isBusinessDay).length;
}

export function businessDaysInMonth(year: number, month: number): string[] {
  const total = new Date(year, month + 1, 0).getDate();
  const days: string[] = [];
  for (let day = 1; day <= total; day += 1) {
    const key = toKey(new Date(year, month, day));
    if (isBusinessDay(key)) days.push(key);
  }
  return days;
}
