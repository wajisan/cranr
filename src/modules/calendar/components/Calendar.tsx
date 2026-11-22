import { useRef, type PointerEvent } from 'react';
import { buildMonthCells, monthLabel } from '../logic/dateRange';
import type { Mode } from '../logic/useCraState';
import type { StrokeOp } from '../logic/paintDays';
import { CalendarGrid } from './CalendarGrid';
import { MonthNav } from './MonthNav';

type Props = {
  year: number;
  month: number;
  presence: readonly string[];
  absences: readonly string[];
  mode: Mode;
  onShift: (delta: number) => void;
  onPaintSpan: (presence: readonly string[], absences: readonly string[], anchor: string, end: string, op: StrokeOp, mode: Mode) => void;
  blank: boolean;
  onSweep: () => void;
  onToday: () => void;
};

const SWIPE_DISTANCE = 50;
const SWIPE_MAX_MS = 600;

function useSwipeMonth(onShift: (delta: number) => void) {
  const start = useRef<{ x: number; y: number; time: number } | null>(null);
  return {
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      const onBusinessDay = (event.target as Element).closest('[data-date]:not(.off)');
      start.current = onBusinessDay ? null : { x: event.clientX, y: event.clientY, time: event.timeStamp };
    },
    onPointerUp: (event: PointerEvent<HTMLElement>) => {
      const from = start.current;
      start.current = null;
      if (!from) return;
      const dx = event.clientX - from.x;
      const dy = event.clientY - from.y;
      if (event.timeStamp - from.time > SWIPE_MAX_MS) return;
      if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      onShift(dx < 0 ? 1 : -1);
    },
    onPointerCancel: () => {
      start.current = null;
    },
  };
}

export function Calendar(props: Props) {
  const swipe = useSwipeMonth(props.onShift);
  const now = new Date();
  const isCurrentMonth = props.year === now.getFullYear() && props.month === now.getMonth();
  return (
    <section className="calendar" style={{ touchAction: 'pan-y' }} {...swipe}>
      <MonthNav
        isCurrentMonth={isCurrentMonth}
        label={monthLabel(props.year, props.month)}
        onPrev={() => props.onShift(-1)}
        onNext={() => props.onShift(1)}
        blank={props.blank}
        onSweep={props.onSweep}
        onToday={props.onToday}
      />
      <CalendarGrid
        cells={buildMonthCells(props.year, props.month)}
        presence={props.presence}
        absences={props.absences}
        mode={props.mode}
        onPaintSpan={props.onPaintSpan}
      />
    </section>
  );
}
