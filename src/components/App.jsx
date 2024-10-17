import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Homepage } from 'pages/Home/Homepage';
import { DiaryPage } from 'pages/Diary/DiaryPage';
import { CalculatorPage } from 'pages/Calculator/CalculatorPage';
import { LoginPage } from 'pages/Login/LoginPage';
import { RegistrationPage } from 'pages/Registration/RegistrationPage';
import { PageNotFound } from 'pages/PageNotFound/PageNotFound';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { routes } from './Routes/routes.js';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [userParams, setUserParams] = useState(null); // Replace with appropriate initial state

  const openDiaryModal = data => {
    // Set userParams based on your logic here
    setUserParams(`{ age: {age} height: {height} weight:{weight}}`); // Example params
    setModalOpen(true);
  };

  const closeDiaryModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Routes>
        <Route>
          <Route path="/" element={<SharedLayout />}>
            <Route
              path="/"
              index
              element={
                <RestrictedRoute
                  redirectTo="/calculator"
                  component={Homepage}
                />
              }
            />
            <Route
              path={routes.diary}
              element={
                <PrivateRoute redirectTo="/login" component={DiaryPage} />
              }
            />
            <Route
              path={routes.calculator}
              element={
                <PrivateRoute redirectTo="/login" component={CalculatorPage} />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute redirectTo="/diary" component={LoginPage} />
              }
            />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>
      </Routes>
      {/*{isModalOpen && (*/}
      {/*  <DiaryModal onClose={closeDiaryModal} userParams={userParams} />*/}
      {/*)}*/}
    </>
  );
}

export default App;
