const STORAGE_KEY = 'cranr';
const DATE_KEY = /^\d{4}-\d{2}-\d{2}$/;

export type PersistedState = {
  theme: 'light' | 'dark';
  year: number;
  month: number;
  presence: string[];
  range: { start: string; end: string } | null;
  absences: string[];
  seeded: string[];
};

export function defaultState(now = new Date()): PersistedState {
  return {
    theme: 'light',
    year: now.getFullYear(),
    month: now.getMonth(),
    presence: [],
    range: null,
    absences: [],
    seeded: [],
  };
}

export function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return sanitize(JSON.parse(raw));
  } catch {
    return defaultState();
  }
}

export function saveState(state: PersistedState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function sanitize(value: unknown): PersistedState {
  const base = defaultState();
  if (!isRecord(value)) return base;
  return {
    theme: value.theme === 'dark' ? 'dark' : 'light',
    year: isYear(value.year) ? value.year : base.year,
    month: isMonth(value.month) ? value.month : base.month,
    presence: readDays(value.presence),
    range: readRange(value.range),
    absences: readDays(value.absences),
    seeded: readMonths(value.seeded),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isYear(value: unknown): value is number {
  return typeof value === 'number' && value >= 1900 && value <= 2200;
}

function isMonth(value: unknown): value is number {
  return typeof value === 'number' && value >= 0 && value <= 11;
}

function isDateKey(value: unknown): value is string {
  return typeof value === 'string' && DATE_KEY.test(value);
}

function readRange(value: unknown): PersistedState['range'] {
  if (!isRecord(value) || !isDateKey(value.start) || !isDateKey(value.end)) return null;
  return value.start <= value.end
    ? { start: value.start, end: value.end }
    : { start: value.end, end: value.start };
}

function readDays(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isDateKey);
}

function readMonths(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => typeof item === 'string' && /^\d{4}-\d{2}$/.test(item));
}
