import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';

if (import.meta.env.MODE === 'development') {
  startMSWWorker();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function startMSWWorker() {
  const { worker } = await import('./services/mocks/browser');
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}
