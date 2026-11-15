type Props = {
  dateKey: string;
  off: boolean;
  present: boolean;
  absent: boolean;
  onPointerDown: (dateKey: string) => void;
};

export function CalendarDay({ dateKey, off, present, absent, onPointerDown }: Props) {
  return (
    <button
      type="button"
      data-date={dateKey}
      className={dayClass(off, present, absent)}
      disabled={off}
      aria-pressed={!off && (present || absent)}
      aria-label={dateKey}
      onPointerDown={() => onPointerDown(dateKey)}
    >
      {Number(dateKey.slice(8))}
    </button>
  );
}

function dayClass(off: boolean, present: boolean, absent: boolean): string {
  const names = ['day'];
  if (off) names.push('off');
  if (!off && present) names.push('range');
  if (!off && absent) names.push('absence');
  return names.join(' ');
}
