import { HeroesApp } from '@/HeroesApp'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroesApp />
  </StrictMode>,
)
