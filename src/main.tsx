import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { IMRProvider } from './context/IMRContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IMRProvider>
      <App />
    </IMRProvider>
  </StrictMode>,
)
