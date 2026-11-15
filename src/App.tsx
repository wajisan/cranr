import type { ReactNode } from 'react';
import { Calendar } from './modules/calendar/components/Calendar';
import { useCraState } from './modules/calendar/logic/useCraState';
import { Counter } from './modules/counter/components/Counter';
import { Logo } from './shared/icons/Logo';
import { Moon } from './shared/icons/Moon';
import { Suitcase } from './shared/icons/Suitcase';
import { Sun } from './shared/icons/Sun';
import { Tree } from './shared/icons/Tree';

export function App() {
  const cra = useCraState();
  return (
    <div className="app">
      <div className="frame">
        <header className="navbar">
          <Brand />
          <ThemeButton dark={cra.theme === 'dark'} onToggle={cra.toggleTheme} />
        </header>
        <main className="layout">
          <Calendar {...calendarProps(cra)} />
          <Summary cra={cra} />
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
  };
}

function Summary({ cra }: { cra: ReturnType<typeof useCraState> }) {
  return (
    <section className="summary">
      <div className="mode-switch">
        <ModeButton label="Présence" tone="work" pressed={cra.mode === 'presence'} onClick={() => cra.setMode('presence')}>
          <Suitcase />
        </ModeButton>
        <ModeButton label="Congé" tone="leave" pressed={cra.mode === 'absence'} onClick={() => cra.setMode('absence')}>
          <Tree />
        </ModeButton>
      </div>
      <Counter count={cra.count} />
    </section>
  );
}

function Brand() {
  return (
    <div className="brand">
      <Logo />
      <h1>CRA</h1>
    </div>
  );
}

function ThemeButton({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button type="button" className="icon-btn" aria-label={dark ? 'Clair' : 'Sombre'} onClick={onToggle}>
      {dark ? <Sun /> : <Moon />}
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
