import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage'; 
// import './App.css'; 

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<CalculatorPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
