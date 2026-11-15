import type { DateRange } from '../types';

export function toKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function fromKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function eachDay(start: string, end: string): string[] {
  const [from, to] = start <= end ? [start, end] : [end, start];
  const days: string[] = [];
  const cursor = fromKey(from);
  while (toKey(cursor) <= to) {
    days.push(toKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export function buildMonthCells(year: number, month: number): (string | null)[] {
  const lead = (new Date(year, month, 1).getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  const cells: (string | null)[] = Array.from({ length: lead }, () => null);
  for (let day = 1; day <= count; day += 1) cells.push(toKey(new Date(year, month, day)));
  while (cells.length < 42) cells.push(null);
  return cells;
}

export function shiftMonth(year: number, month: number, delta: number) {
  const next = new Date(year, month + delta, 1);
  return { year: next.getFullYear(), month: next.getMonth() };
}

export function isWithin(key: string, range: DateRange | null): boolean {
  if (!range) return false;
  return key >= range.start && key <= range.end;
}

export function formatRangeLabel(start: string, end: string): string {
  return `${dayNumber(start)} → ${dayNumber(end)}`;
}

export function monthLabel(year: number, month: number): string {
  return `${month + 1} · ${year}`;
}

function dayNumber(key: string): number {
  return Number(key.slice(8));
}
