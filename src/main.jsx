import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './router.jsx'
import { ContextProvider } from './contexts/ContextProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ContextProvider>
    <RouterProvider router={Router}/>
    </ContextProvider>
  </React.StrictMode>,
)
