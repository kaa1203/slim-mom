import { H2, WrapperWithFruits } from '../../components/Home/Home.styled';
import { WeightForm } from '../../components/Form/Form';
import React from 'react';
import { Box } from 'components/Box';
import { useState } from 'react';
import Modal from 'components/Modal/Modal';
// import { setUserGoogle, setInfoUser } from 'redux/authSlice';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { HomeForm } from 'components/HomeForm/HomeForm';

export const HomePage = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [userParams, setUserParams] = useState(null);
  // const dispatch = useDispatch();

  // const [updateGoogleUser] = useUpdateGoogleUserMutation();

  const body = document.querySelector('body');

  const onModalClose = () => {
    setIsModalOpened(isModalOpened => !isModalOpened);
    body.style.overflow = 'auto';
  };

  // useEffect(() => {
  //   const queryStr = window.location.search
  //     .replace('?', '')
  //     .split('&')
  //     .reduce(function (p, e) {
  //       var a = e.split('=');
  //       p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
  //       return p;
  //     }, {});

  //   if (!queryStr.name) {
  //     return;
  //   }

  //   const paramsLocalStorage = JSON.parse(localStorage.getItem('params'));

  //   // if (!queryStr.userid) {
  //   //   dispatch(setUserGoogle(queryStr));
  //   //   return;
  //   // }

  //   const newUser = {
  //     ...queryStr,
  //     ...paramsLocalStorage,
  //   };
  //   delete newUser.name;
  //   delete newUser.token;
  //   delete newUser.email;

  //   // updateGoogleUser(newUser).unwrap();

  //   dispatch(setInfoUser(paramsLocalStorage));
  //   dispatch(setUserGoogle(queryStr));
  // }, [dispatch, updateGoogleUser]);

  return (
    <WrapperWithFruits>
      <Box style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {isModalOpened && <Modal onClose={onModalClose} userParams={userParams} />}
        <H2>Calculate your daily calorie intake right now</H2>
        <WeightForm
          openModal={setIsModalOpened}
          setUserParams={setUserParams}
        />
        {/* <HomeForm /> */}
      </Box>
    </WrapperWithFruits>
  );
};
