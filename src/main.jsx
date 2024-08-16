import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';

// IMPORT FILE STATIC
import App from './App.jsx';

// IMPORT STYLING
import 'react-loading-skeleton/dist/skeleton.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './style/global.css';

// IMPORT ICONS
import 'primeicons/primeicons.css';
import { Toaster } from 'sonner';
        
ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <PrimeReactProvider value={{ pt: Tailwind }}>
      <HelmetProvider>
        <App />
        <Toaster />
      </HelmetProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
)
