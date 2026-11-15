import { toKey } from './dateRange';

const cache = new Map<number, ReadonlySet<string>>();

export function holidayKeys(year: number): ReadonlySet<string> {
  const hit = cache.get(year);
  if (hit) return hit;
  const keys = new Set(datesFor(year).map(toKey));
  cache.set(year, keys);
  return keys;
}

export function isHoliday(key: string): boolean {
  return holidayKeys(Number(key.slice(0, 4))).has(key);
}

function datesFor(year: number): Date[] {
  const easter = easterSunday(year);
  return [
    fixed(year, 0, 1),
    addDays(easter, 1),
    fixed(year, 4, 1),
    fixed(year, 4, 8),
    addDays(easter, 39),
    addDays(easter, 50),
    fixed(year, 6, 14),
    fixed(year, 7, 15),
    fixed(year, 10, 1),
    fixed(year, 10, 11),
    fixed(year, 11, 25),
  ];
}

function fixed(year: number, month: number, day: number): Date {
  return new Date(year, month, day);
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
  return next;
}

function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}
