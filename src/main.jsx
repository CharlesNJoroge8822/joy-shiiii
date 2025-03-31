import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SalesProvider } from './context/salesContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <SalesProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </SalesProvider>
)
