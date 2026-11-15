export const lightColors = {
  bg: '#ffffff',
  card: '#ffffff',
  text: '#141414',
  muted: '#8a8a8a',
  rangeBg: '#d5e4f7',
  rangeText: '#1a3f73',
  workInk: '#1a3f73',
  absenceBg: '#f3e4b8',
  absenceText: '#6e5310',
  leaveInk: '#8a6914',
  offText: '#ffffff',
  offBg: '#141414',
  hover: '#f4f4f4',
  shadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
  border: '#efefef',
} as const;

export const darkColors = {
  bg: '#141414',
  card: '#1c1c1c',
  text: '#f5f5f5',
  muted: '#8a8a8a',
  rangeBg: '#243e66',
  rangeText: '#d5e4f7',
  workInk: '#9dbeea',
  absenceBg: '#5a4a22',
  absenceText: '#f6e7c1',
  leaveInk: '#e4c56a',
  offText: '#f5f5f5',
  offBg: '#0a0a0a',
  hover: '#2a2a2a',
  shadow: '0 10px 40px rgba(0, 0, 0, 0.35)',
  border: '#2a2a2a',
} as const;

export type Theme = 'light' | 'dark';

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.dataset.theme = theme;
  writeVars(theme === 'dark' ? darkColors : lightColors);
}

function writeVars(group: object): void {
  const root = document.documentElement;
  for (const [name, value] of Object.entries(group)) {
    root.style.setProperty(`--${toKebab(name)}`, String(value));
  }
}

function toKebab(name: string): string {
  return name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
