import type { ReactNode } from 'react';
import { BrushCleaning, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { Logo } from '../../../shared/icons/Logo';

type Props = {
  label: string;
  onPrev: () => void;
  onNext: () => void;
  blank: boolean;
  onSweep: () => void;
  onToday: () => void;
};

export function MonthNav({ label, onPrev, onNext, blank, onSweep, onToday }: Props) {
  return (
    <div className="month-nav">
      <IconButton label="Mois en cours" onClick={onToday}>
        <Logo size={18} />
      </IconButton>
      <IconButton label="Mois précédent" onClick={onPrev}>
        <ChevronLeft size={18} strokeWidth={1.75} aria-hidden />
      </IconButton>
      <span className="month-label">{label}</span>
      <IconButton label="Mois suivant" onClick={onNext}>
        <ChevronRight size={18} strokeWidth={1.75} aria-hidden />
      </IconButton>
      <IconButton label={blank ? 'Remplir le mois' : 'Vider le mois'} onClick={onSweep}>
        {blank ? <TrendingUp size={18} strokeWidth={1.75} aria-hidden /> : <BrushCleaning size={18} strokeWidth={1.75} aria-hidden />}
      </IconButton>
    </div>
  );
}

function IconButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  const active = pressed ? 'icon-btn active' : 'icon-btn';
  return (
    <button type="button" className={active} aria-label={label} aria-pressed={pressed} onClick={onClick}>
      {children}
    </button>
  );
}
