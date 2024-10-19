import { H2, WrapperWithFruits } from './HomePage.styled.js';
import { WeightForm } from '../../components/Form/Form';
import React, { useState } from 'react';
import { Box } from 'components/Box';
import Modal from 'components/Modal/Modal';

export const HomePage = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [userParams, setUserParams] = useState(null);

  const body = document.querySelector('body');

  const onModalClose = () => {
    setIsModalOpened(isModalOpened => !isModalOpened);
    body.style.overflow = 'auto';
  };

  return (
    <WrapperWithFruits>
      <Box style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {isModalOpened && (
          <Modal onClose={onModalClose} userParams={userParams} />
        )}
        <H2>Calculate your daily calorie intake right now</H2>
        <WeightForm
          openModal={setIsModalOpened}
          isModalOpened = {isModalOpened}
          setUserParams={setUserParams}
        />
      </Box>
    </WrapperWithFruits>
  );
};
