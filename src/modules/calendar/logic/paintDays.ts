export type StrokeOp = 'add' | 'remove';

export function strokeOp(marked: boolean): StrokeOp {
  return marked ? 'remove' : 'add';
}

export function paintDay(days: readonly string[], key: string, op: StrokeOp): string[] {
  if (op === 'remove') return days.filter((day) => day !== key);
  return days.includes(key) ? [...days] : [...days, key];
}

export function withoutDay(days: readonly string[], key: string): string[] {
  return days.filter((day) => day !== key);
}
