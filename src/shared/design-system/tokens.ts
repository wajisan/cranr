import { applyTheme, darkColors, lightColors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const tokens = { lightColors, darkColors, typography, spacing };

export function applyTokens(theme: 'light' | 'dark'): void {
  applyTheme(theme);
  writeStatic(typography);
  writeStatic(spacing);
  syncThemeColor(theme);
}

function syncThemeColor(theme: 'light' | 'dark'): void {
  const color = theme === 'dark' ? darkColors.bg : lightColors.bg;
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.setAttribute('content', color));
}

function writeStatic(group: object): void {
  const root = document.documentElement;
  for (const [name, value] of Object.entries(group)) {
    root.style.setProperty(`--${toKebab(name)}`, String(value));
  }
}

function toKebab(name: string): string {
  return name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
