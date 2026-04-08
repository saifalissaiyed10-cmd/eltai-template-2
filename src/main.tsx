import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress ResizeObserver loop limit exceeded error
const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('ResizeObserver loop limit exceeded')) {
    return;
  }
  originalError(...args);
};

window.addEventListener('error', (e) => {
  if (e.message && e.message.includes('ResizeObserver')) {
    e.stopImmediatePropagation();
  }
  if (!e.message || e.message === 'Uncaught ') {
    e.stopImmediatePropagation();
  }
});

window.addEventListener('unhandledrejection', (e) => {
  if (!e.reason || e.reason.message === 'Uncaught ') {
    e.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
