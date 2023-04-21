import React from 'react';
import './scss/index.scss'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <BrowserRouter>
      <AppRouter />
     </BrowserRouter>
  </React.StrictMode>
);
