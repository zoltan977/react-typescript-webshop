import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import history from './shared/utils/history';

import App from './App';
import { overwriteLocalstorageMethodsToDetectStorageChanges } from './overwriteLocalstorage';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './shared/components/errors/errorBoundary/errorBoundary';
import CustomRouter from './shared/components/routing/custom-router/custom-router';

overwriteLocalstorageMethodsToDetectStorageChanges();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CustomRouter history={history}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </CustomRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
