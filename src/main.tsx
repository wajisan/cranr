import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { applyTokens } from './shared/design-system';
import { loadRemoteTokens } from './shared/design-system/remoteTokens';
import { loadState } from './shared/storage/storage';
import './shared/design-system/tokens.css';
import './shared/design-system/fonts.css';
import './index.css';

applyTokens(loadState().theme);
loadRemoteTokens();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
