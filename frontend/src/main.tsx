import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './i18n';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import './index.css';
import App from './App';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
