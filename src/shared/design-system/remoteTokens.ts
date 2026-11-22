// Source de vérité : le site du design system. La copie locale (tokens.css, importée dans main.tsx)
// s'applique d'abord et sert de repli : si le site est injoignable, la feuille distante est retirée
// et rien ne change. Ajoutée en fin de <head>, elle passe après le CSS local dans la cascade.
const REMOTE_TOKENS = 'https://design.wajitech.fr/tokens/tokens.css';

export function loadRemoteTokens() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = REMOTE_TOKENS;
  link.onerror = () => link.remove();
  document.head.append(link);
}
