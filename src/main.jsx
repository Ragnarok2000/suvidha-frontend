import * as Sentry from "@sentry/react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize Sentry for Real User Monitoring
Sentry.init({
  dsn: "https://64ac9c35f772ccb33991402e9971a024@o4510312652537856.ingest.de.sentry.io/4510312667349072", // Replace with your actual DSN from Sentry
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0, // Capture 100% of transactions (set to 0.2-0.5 in production)
  replaysSessionSampleRate: 0.1, // Sample 10% of sessions for replays
  replaysOnErrorSampleRate: 1.0, // Capture all sessions with errors
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
