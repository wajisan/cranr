import type { AbsenceKey } from '../types';

export function toggleAbsence(absences: readonly AbsenceKey[], key: AbsenceKey): AbsenceKey[] {
  return absences.includes(key) ? absences.filter((day) => day !== key) : [...absences, key];
}
