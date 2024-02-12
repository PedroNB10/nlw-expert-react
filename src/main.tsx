import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import './index.css'

import { Toaster } from 'sonner' // Serve para colocar mensagem no canto da tela após pressionar um botão por exemplo.


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster richColors />
  </React.StrictMode>,
)
