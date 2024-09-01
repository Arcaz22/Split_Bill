import React from 'react';
import { App } from './App';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './store';
import './assets/css/index.css';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
  </React.StrictMode>
);
