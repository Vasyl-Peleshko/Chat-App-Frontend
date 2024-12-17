import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/User.tsx'
import { SocketContextProvider } from './context/Socket.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SocketContextProvider>
      <App />
      </SocketContextProvider>
    </AuthProvider>
  </StrictMode>,
)
