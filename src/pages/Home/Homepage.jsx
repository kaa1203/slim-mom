import { H2, WrapperWithFruits } from './Home.styled';
import { WeightForm } from '../../components/Form/Form';
import React from 'react';
import { Box } from 'components/Box';
import { useState } from 'react';
import Modal from 'components/Modal/Modal';
export const HomePage = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [userParams, setUserParams] = useState(null);
  const body = document.querySelector('body');

  const onModalClose = () => {
    setIsModalOpened(isModalOpened => !isModalOpened);
    body.style.overflow = 'auto';
  };

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
        {isModalOpened && (
          <Modal onClose={onModalClose} userParams={userParams} />
        )}
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
