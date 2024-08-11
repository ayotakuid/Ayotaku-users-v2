import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import App from './App.jsx';
import 'react-loading-skeleton/dist/skeleton.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";


ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
