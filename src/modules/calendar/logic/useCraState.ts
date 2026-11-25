import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { applyTokens } from '../../../shared/design-system';
import { loadState, saveState } from '../../../shared/storage/storage';
import { businessDaysInMonth, isBusinessDay } from './businessDays';
import { eachDay, shiftMonth } from './dateRange';
import { paintDay, withoutDay, type StrokeOp } from './paintDays';

export type Mode = 'presence' | 'absence';

export type CraState = {
  theme: 'light' | 'dark';
  year: number;
  month: number;
  presence: string[];
  absences: string[];
  seeded: string[];
};

export function useCraState() {
  const [state, setState] = useState(fromPersisted);
  const [mode, setMode] = useState<Mode>('absence');
  useEffect(() => persist(state), [state]);
  return present(state, setState, mode, setMode);
}

function fromPersisted(saved = loadState()): CraState {
  return ensureMonth({
    theme: saved.theme,
    year: saved.year,
    month: saved.month,
    presence: saved.presence,
    absences: saved.absences,
    seeded: saved.seeded,
  });
}

function persist(state: CraState): void {
  applyTokens(state.theme);
  saveState({ ...state, range: null });
}

function present(
  state: CraState,
  setState: Dispatch<SetStateAction<CraState>>,
  mode: Mode,
  setMode: Dispatch<SetStateAction<Mode>>,
) {
  return {
    theme: state.theme,
    year: state.year,
    month: state.month,
    presence: state.presence,
    absences: state.absences,
    mode,
    blank: monthIsBlank(state),
    count: netDays(state),
    total: businessDaysInMonth(state.year, state.month).length,
    toggleTheme: () => setState(flipTheme),
    setMode,
    shift: (delta: number) => setState((current) => moveMonth(current, delta)),
    today: () => setState(goToday),
    sweep: () => setState(sweepMonth),
    paintSpan: (presence: readonly string[], absences: readonly string[], anchor: string, end: string, op: StrokeOp, strokeMode: Mode) =>
      setState((current) => spanFrom(withDays(current, presence, absences), anchor, end, op, strokeMode)),
  };
}

function netDays(state: CraState): number {
  return daysInMonth(state.presence, state) - daysInMonth(state.absences, state);
}

function daysInMonth(days: readonly string[], state: CraState): number {
  const prefix = monthPrefix(state.year, state.month);
  return days.filter((key) => key.startsWith(prefix) && isBusinessDay(key)).length;
}

function ensureMonth(state: CraState): CraState {
  const prefix = monthPrefix(state.year, state.month);
  if (state.seeded.includes(prefix)) return state;
  const presence = state.presence.filter((key) => !key.startsWith(prefix));
  return { ...state, presence: presence.concat(businessDaysInMonth(state.year, state.month)), seeded: [...state.seeded, prefix] };
}

function withDays(state: CraState, presence: readonly string[], absences: readonly string[]): CraState {
  return { ...state, presence: [...presence], absences: [...absences] };
}

function spanFrom(base: CraState, anchor: string, end: string, op: StrokeOp, mode: Mode): CraState {
  return eachDay(anchor, end).filter(isBusinessDay).reduce((state, key) => applyDay(state, key, op, mode), base);
}

function applyDay(state: CraState, key: string, op: StrokeOp, mode: Mode): CraState {
  if (!isBusinessDay(key)) return state;
  return mode === 'presence' ? paintPresence(state, key, op) : paintAbsence(state, key, op);
}

function paintPresence(state: CraState, key: string, op: StrokeOp): CraState {
  return {
    ...state,
    presence: paintDay(state.presence, key, op),
    absences: withoutDay(state.absences, key),
  };
}

function paintAbsence(state: CraState, key: string, op: StrokeOp): CraState {
  return {
    ...state,
    absences: paintDay(state.absences, key, op),
    presence: op === 'add' ? paintDay(state.presence, key, 'add') : state.presence,
  };
}

function sweepMonth(state: CraState): CraState {
  return monthIsBlank(state) ? fillMonth(state) : emptyMonth(state);
}

function monthIsBlank(state: CraState): boolean {
  const prefix = monthPrefix(state.year, state.month);
  const inMonth = (key: string) => key.startsWith(prefix);
  return !state.presence.some(inMonth) && !state.absences.some(inMonth);
}

function emptyMonth(state: CraState): CraState {
  const prefix = monthPrefix(state.year, state.month);
  return {
    ...state,
    presence: state.presence.filter((key) => !key.startsWith(prefix)),
    absences: state.absences.filter((key) => !key.startsWith(prefix)),
  };
}

function fillMonth(state: CraState): CraState {
  const prefix = monthPrefix(state.year, state.month);
  const presence = state.presence.filter((key) => !key.startsWith(prefix));
  return {
    ...state,
    presence: presence.concat(businessDaysInMonth(state.year, state.month)),
    absences: state.absences.filter((key) => !key.startsWith(prefix)),
  };
}

function monthPrefix(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

function moveMonth(state: CraState, delta: number): CraState {
  return ensureMonth({ ...state, ...shiftMonth(state.year, state.month, delta) });
}

function goToday(state: CraState): CraState {
  const now = new Date();
  return ensureMonth({ ...state, year: now.getFullYear(), month: now.getMonth() });
}

function flipTheme(state: CraState): CraState {
  return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
}
