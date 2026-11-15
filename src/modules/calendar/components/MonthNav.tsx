import type { ReactNode } from 'react';
import { ChevronLeft } from '../../../shared/icons/ChevronLeft';
import { ChevronRight } from '../../../shared/icons/ChevronRight';
import { Broom } from '../../../shared/icons/Broom';
import { TrendUp } from '../../../shared/icons/TrendUp';

type Props = {
  label: string;
  onPrev: () => void;
  onNext: () => void;
  blank: boolean;
  onSweep: () => void;
};

export function MonthNav({ label, onPrev, onNext, blank, onSweep }: Props) {
  return (
    <div className="month-nav">
      <IconButton label="Mois précédent" onClick={onPrev}>
        <ChevronLeft />
      </IconButton>
      <span className="month-label">{label}</span>
      <IconButton label="Mois suivant" onClick={onNext}>
        <ChevronRight />
      </IconButton>
      <IconButton label={blank ? 'Remplir le mois' : 'Vider le mois'} onClick={onSweep}>
        {blank ? <TrendUp /> : <Broom />}
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
