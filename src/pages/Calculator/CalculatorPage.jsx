import { Box } from 'components/Box';
import { WeightForm } from 'components/Form/Form';
import React, { useState } from 'react';
import {
  CalculatorPageWrapper,
  H2,
  WrapperAll,
} from '../../components/CalculatorPage/CalculatorPage.styled';
// import { getUserInfo } from 'redux/authSelectors';
import { useAuth } from 'hooks/useAuth';
// import { useSelector } from 'react-redux';
import Modal from 'components/Modal/Modal';
import { RightSideBar } from '../../components/RightSideBar/RightSideBar';

const CalculatorPage = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [userParams, setUserParams] = useState(null);
  const { user } = useAuth();
  const info = user;
  const userInfo = { ...info };
  delete userInfo.dailyRate;
  delete userInfo.notAllowedProducts;
  delete userInfo.notAllowedProductsAll;
  const body = document.querySelector('body');

  const onModalClose = () => {
    setIsModalOpened(isModalOpened => !isModalOpened);
    body.style.overflow = 'auto';
  };

  return (
    <WrapperAll>
      <CalculatorPageWrapper>
        {isModalOpened && (
          <Modal onClose={onModalClose} userParams={userParams} />
        )}
        <Box style={{maxWidth:'1280px', margin:'0 auto'}}>
          <H2>Calculate your daily calorie intake right now</H2>
          <WeightForm
            initialValues={userInfo}
            openModal={setIsModalOpened}
            setUserParams={setUserParams}
          />
        </Box>
      </CalculatorPageWrapper>
      <RightSideBar />
    </WrapperAll>
  );
};
export { CalculatorPage };
