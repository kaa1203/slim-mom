import { Wrapper, WrapperAll } from './DiaryPage.styled.js';
import { DiaryAddProductForm } from 'components/DiaryAddProductForm/DiaryAddProductForm';
import { DiaryDateCalendar } from '../../components/DiaryDateCalendar/DiaryDateCalendar';
import { DiaryProductsList } from '../../components/DiaryProductList/DiaryProductList';
import { RightSideBar } from 'components/RightSideBar/RightSideBar';
import React from 'react';
import { useState } from 'react';
import { DiaryModal } from 'components/DiaryModal/DiaryModal';
import { useMediaQuery } from 'react-responsive';
import { Button } from './DiaryPage.styled.js';
import AddIcon from '../../images/svg/add.svg';
import { Box } from 'components/Box';

const body = document.querySelector('body');

const DiaryPage = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const mobile = useMediaQuery({ query: '(max-width: 426px)' });

  const onModalOpen = () => {
    setIsModalOpened(true);
    body.style.overflow = 'hidden';
  };

  const onModalClose = () => {
    setIsModalOpened(isModalOpened => !isModalOpened);
    body.style.overflow = 'auto';
  };

  return (
    <WrapperAll>
      <Wrapper>
        <DiaryDateCalendar />
        {!mobile && <DiaryAddProductForm />}
        <Box textAlign="center">
          <DiaryProductsList />
          {mobile && (
            <Button onClick={() => onModalOpen()}>
              <img src={AddIcon} alt="add product" />
            </Button>
          )}
        </Box>
        {isModalOpened && <DiaryModal onClose={onModalClose} />}
      </Wrapper>
      <RightSideBar />
    </WrapperAll>
  );
};
export { DiaryPage };
