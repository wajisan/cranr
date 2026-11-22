import { useEffect, useRef, type RefObject } from 'react';
import { isBusinessDay } from '../logic/businessDays';
import { strokeOp, type StrokeOp } from '../logic/paintDays';
import type { Mode } from '../logic/useCraState';
import { CalendarDay } from './CalendarDay';

const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

type Drag = { anchor: string; op: StrokeOp; mode: Mode; presence: string[]; absences: string[] };

type Props = {
  cells: readonly (string | null)[];
  presence: readonly string[];
  absences: readonly string[];
  mode: Mode;
  onPaintSpan: (presence: readonly string[], absences: readonly string[], anchor: string, end: string, op: StrokeOp, mode: Mode) => void;
};

export function CalendarGrid(props: Props) {
  const drag = useDragSession(props.onPaintSpan);
  const edges = edgeKeys(props.cells);
  const firstIndex = props.cells.findIndex((key) => key !== null);
  return (
    <div className="grid">
      <Weekdays />
      {props.cells.map((dateKey, index) => (
        <Cell
          key={dateKey ?? `e-${index}`}
          dateKey={dateKey}
          edgeKey={index < firstIndex ? edges.first : edges.last}
          {...props}
          onStart={(key) => startDrag(drag, key, props)}
        />
      ))}
    </div>
  );
}

function useDragSession(onPaintSpan: Props['onPaintSpan']) {
  const drag = useRef<Drag | null>(null);
  const paint = useRef(onPaintSpan);
  paint.current = onPaintSpan;
  useEffect(() => bindDrag(drag, paint), []);
  return drag;
}

function bindDrag(drag: RefObject<Drag | null>, paint: RefObject<Props['onPaintSpan']>) {
  const move = (event: PointerEvent) => extendDrag(drag, event, paint);
  const up = (event: PointerEvent) => finishDrag(drag, event, paint);
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  window.addEventListener('pointercancel', up);
  return () => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
    window.removeEventListener('pointercancel', up);
  };
}

function startDrag(drag: RefObject<Drag | null>, key: string, props: Props) {
  if (!isBusinessDay(key)) return;
  const marked = props.mode === 'absence' ? props.absences.includes(key) : isWorked(props, key);
  drag.current = { anchor: key, op: strokeOp(marked), mode: props.mode, presence: [...props.presence], absences: [...props.absences] };
  paintDrag(drag.current, key, props.onPaintSpan);
}

function extendDrag(drag: RefObject<Drag | null>, event: PointerEvent, paint: RefObject<Props['onPaintSpan']>) {
  if (!drag.current || event.buttons !== 1) return;
  const key = businessDayAt(event.clientX, event.clientY);
  if (key) paintDrag(drag.current, key, paint.current);
}

function finishDrag(drag: RefObject<Drag | null>, event: PointerEvent, paint: RefObject<Props['onPaintSpan']>) {
  const stroke = drag.current;
  if (!stroke) return;
  drag.current = null;
  const key = businessDayAt(event.clientX, event.clientY);
  if (key) paintDrag(stroke, key, paint.current);
}

function isWorked(props: Props, key: string): boolean {
  return props.presence.includes(key) && !props.absences.includes(key);
}

function paintDrag(stroke: Drag, key: string, onPaintSpan: Props['onPaintSpan']) {
  onPaintSpan(stroke.presence, stroke.absences, stroke.anchor, key, stroke.op, stroke.mode);
}

function businessDayAt(x: number, y: number): string | null {
  const target = document.elementFromPoint(x, y);
  const key = target?.closest('[data-date]')?.getAttribute('data-date');
  if (key) return isBusinessDay(key) ? key : null;
  return edgeKeyAt(x, y);
}

// Les cases vides sont `visibility: hidden` : elles échappent à elementFromPoint, on teste leur rectangle.
function edgeKeyAt(x: number, y: number): string | null {
  for (const cell of document.querySelectorAll<HTMLElement>('[data-edge-key]')) {
    const rect = cell.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return cell.dataset.edgeKey ?? null;
  }
  return null;
}

function edgeKeys(cells: readonly (string | null)[]) {
  const days = cells.filter((key): key is string => key !== null && isBusinessDay(key));
  return { first: days[0] ?? null, last: days[days.length - 1] ?? null };
}

function Weekdays() {
  return WEEKDAYS.map((label, index) => (
    <span key={`${label}-${index}`} className="weekday">
      {label}
    </span>
  ));
}

function Cell(props: Props & { dateKey: string | null; edgeKey: string | null; onStart: (key: string) => void }) {
  if (!props.dateKey) return <span className="day empty" data-edge-key={props.edgeKey ?? undefined} />;
  return (
    <CalendarDay
      dateKey={props.dateKey}
      off={!isBusinessDay(props.dateKey)}
      present={isWorked(props, props.dateKey)}
      absent={props.absences.includes(props.dateKey)}
      onPointerDown={props.onStart}
    />
  );
}
