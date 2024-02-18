import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './Css/index.css'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "./Context/MaterialController.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <NextUIProvider>
        <MaterialTailwindControllerProvider>
        <App />
        </MaterialTailwindControllerProvider>
        </NextUIProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
