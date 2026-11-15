import { countAbsencesInRange } from '../../absences/logic/countAbsencesInRange';
import { countBusinessDays } from '../../calendar/logic/businessDays';

export function computeBillableDays(start: string, end: string, absences: readonly string[]): number {
  return countBusinessDays(start, end) - countAbsencesInRange(start, end, absences);
}
