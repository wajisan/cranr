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

export function Calendar(props: Props) {
  return (
    <section className="calendar">
      <MonthNav
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
