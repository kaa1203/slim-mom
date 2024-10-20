import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App.jsx';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
		<BrowserRouter basename='/slim-mom'>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
      	  <App />
        </PersistGate>
      </Provider>
		</BrowserRouter>
   </React.StrictMode>
);
