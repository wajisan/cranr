export type Theme = 'light' | 'dark';

export const themeColors: Record<Theme, string> = {
  light: '#ede4d8',
  dark: '#1a1a1a',
};

export function applyTokens(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.setAttribute('content', themeColors[theme]));
}
