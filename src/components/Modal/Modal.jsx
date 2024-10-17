import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import DailyCalorieIntake from '../DailyCalorieIntake/DailyCalorieIntake';
import { Overlay, ModalWindow, CloseArrow, ButtonClose } from './Modal.styled';
// import { Loader } from 'components/Loader/Loader';
import { LoaderNew } from 'components/LoaderNew/LoaderNew';
import { useLocation } from 'react-router-dom';
import { routes } from '../Routes/routes';
import { useMediaQuery } from 'react-responsive';
import { selectCalorie } from '../../redux/calorie/selectors';
import { useSelector } from 'react-redux';

const modalRoot = document.querySelector('#root');

export const Modal = ({ onClose, children, userParams }) => {
  const [backResponse, setBackResponse] = useState(null);
  const location = useLocation();
  const isMobile = useMediaQuery({ query: '(max-width: 426px)' });
  const result = useSelector(selectCalorie);
  console.log(userParams);
  console.log(backResponse);
  useEffect(() => {
    if (!userParams) {
      return;
    }

    setBackResponse(result);
  }, [userParams, result]);

  useEffect(() => {
    if (backResponse === null) {
      return;
    }
  }, [backResponse]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape');
      onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose(false);
    }
  };

  return createPortal(
    <Overlay onClick={handleBackDropClick}>
      <ModalWindow
        onClose={onClose}
        style={
          location.pathname === routes.home && isMobile
            ? { top: '460px' }
            : null
        }
      >
        {backResponse ? (
          <DailyCalorieIntake
            backResponse={backResponse}
            userParams={userParams}
          />
        ) : (
          <LoaderNew />
        )}
        {children}
        <ButtonClose type="button" onClick={onClose}></ButtonClose>
        <CloseArrow size="20px" left="20px" onClick={onClose} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
