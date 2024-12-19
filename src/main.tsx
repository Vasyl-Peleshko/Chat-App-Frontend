import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './context/User'
import { SocketContextProvider } from './context/Socket'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SocketContextProvider>
      <App />
      </SocketContextProvider>
    </AuthProvider>
  </StrictMode>,
)
