import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router'
import App from './App.tsx'
import LandingPage from './pages/LandingPage.tsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route index element={<LandingPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
