import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './app.tsx';
import ErrorMessage from './components/error-message/error-message.tsx';
import LoadingScreen from './pages/loading-screen/loading-screen.tsx';
import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <LoadingScreen />
      <App />
    </Provider>
  </React.StrictMode>
);
