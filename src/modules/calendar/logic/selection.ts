import type { DateRange } from '../types';

export type Selection =
  | { phase: 'idle' }
  | { phase: 'anchored'; anchor: string }
  | { phase: 'ranged'; start: string; end: string };

export function beginRange(key: string): Selection {
  return { phase: 'ranged', start: key, end: key };
}

export function extendRange(anchor: string, key: string): Selection {
  const [start, end] = orderKeys(anchor, key);
  return { phase: 'ranged', start, end };
}

export function clearAnchor(selection: Selection): Selection {
  if (selection.phase === 'anchored') return { phase: 'idle' };
  return selection;
}

export function activeRange(selection: Selection): DateRange | null {
  if (selection.phase === 'anchored') return { start: selection.anchor, end: selection.anchor };
  if (selection.phase === 'ranged') return { start: selection.start, end: selection.end };
  return null;
}

function orderKeys(left: string, right: string): [string, string] {
  return left <= right ? [left, right] : [right, left];
}
