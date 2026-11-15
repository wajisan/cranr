import { isBusinessDay } from '../../calendar/logic/businessDays';
import { eachDay } from '../../calendar/logic/dateRange';
import type { AbsenceKey } from '../types';

export function countAbsencesInRange(start: string, end: string, absences: readonly AbsenceKey[]): number {
  const days = new Set(eachDay(start, end));
  return absences.filter((key) => days.has(key) && isBusinessDay(key)).length;
}
