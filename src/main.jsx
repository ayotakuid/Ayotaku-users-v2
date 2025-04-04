import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import { ProgressBarProvider } from './component/utils/ProgressBarProvider.jsx';

// IMPORT FILE STATIC
import App from './App.jsx';

// IMPORT STYLING
import 'react-loading-skeleton/dist/skeleton.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './style/global.css';

// IMPORT ICONS
import 'primeicons/primeicons.css';
import { BrowserRouter } from 'react-router-dom';
        
ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <BrowserRouter>
      <PrimeReactProvider value={{ pt: Tailwind }}>
        <ProgressBarProvider>
          <HelmetProvider>
            <App />
            <Toaster />
          </HelmetProvider>
        </ProgressBarProvider>
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
