import type { ReactNode } from 'react';
import { Briefcase, Moon, Sun, TreePalm } from 'lucide-react';
import { Calendar } from './modules/calendar/components/Calendar';
import { useCraState } from './modules/calendar/logic/useCraState';
import { Counter } from './modules/counter/components/Counter';

export function App() {
  const cra = useCraState();
  return (
    <div className="app">
      <div className="frame">
        <header className="navbar">
          <ThemeButton dark={cra.theme === 'dark'} onToggle={cra.toggleTheme} />
        </header>
        <main className="layout">
          <Summary cra={cra} />
          <Calendar {...calendarProps(cra)} />
        </main>
      </div>
    </div>
  );
}

function calendarProps(cra: ReturnType<typeof useCraState>) {
  return {
    year: cra.year,
    month: cra.month,
    presence: cra.presence,
    absences: cra.absences,
    mode: cra.mode,
    onShift: cra.shift,
    onPaintSpan: cra.paintSpan,
    blank: cra.blank,
    onSweep: cra.sweep,
    onToday: cra.today,
  };
}

function Summary({ cra }: { cra: ReturnType<typeof useCraState> }) {
  return (
    <section className="summary">
      <div className="mode-switch">
        <ModeButton label="Présence" tone="work" pressed={cra.mode === 'presence'} onClick={() => cra.setMode('presence')}>
          <Briefcase size={18} strokeWidth={1.75} aria-hidden />
        </ModeButton>
        <ModeButton label="Congé" tone="leave" pressed={cra.mode === 'absence'} onClick={() => cra.setMode('absence')}>
          <TreePalm size={18} strokeWidth={1.75} aria-hidden />
        </ModeButton>
      </div>
      <Counter count={cra.count} total={cra.total} />
    </section>
  );
}

function ThemeButton({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button type="button" className="icon-btn" aria-label={dark ? 'Clair' : 'Sombre'} onClick={onToggle}>
      {dark ? <Sun size={18} strokeWidth={1.75} aria-hidden /> : <Moon size={18} strokeWidth={1.75} aria-hidden />}
    </button>
  );
}

function ModeButton({ label, tone, pressed, onClick, children }: { label: string; tone: string; pressed: boolean; onClick: () => void; children: ReactNode }) {
  const active = pressed ? `icon-btn ${tone} active` : `icon-btn ${tone}`;
  return (
    <button type="button" className={active} aria-label={label} aria-pressed={pressed} onClick={onClick}>
      {children}
    </button>
  );
}
