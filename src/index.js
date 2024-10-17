import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store.js'; // Add the .js extension
import App from './App.jsx'; // Ensure the correct path to the App component
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename='/slim-mom'>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
