import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import DailyCalorieIntake from '../DailyCalorieIntake/DailyCalorieIntake';
import { ButtonClose, CloseArrow, ErrorWindow, ModalWindow, Overlay } from './Modal.styled';
// import { Loader } from 'components/Loader/Loader';
import { LoaderNew } from 'components/LoaderNew/LoaderNew';
import { useLocation } from 'react-router-dom';
import { routes } from '../Routes/routes';
import { useMediaQuery } from 'react-responsive';
import { selectCalorie } from '../../redux/calorie/selectors';
import { useSelector } from 'react-redux';

const modalRoot = document.querySelector('#root');

const Loading = () => (
  <Overlay>
    <LoaderNew />
  </Overlay>
)

export const Modal = ({ onClose, children, userParams }) => {
  const location = useLocation();
  const isMobile = useMediaQuery({ query: '(max-width: 426px)' });
  const calorie = useSelector(selectCalorie);
  console.log('userParams', userParams);
  console.log('calorie', calorie);

  useEffect(() => {
    if(onClose) {
      const handleKeyDown = e => {
        if (e.key === 'Escape') onClose()
      };

      window.addEventListener('keydown', handleKeyDown);
      const body = document.querySelector('body');
      body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        body.style.overflow = 'auto';
      };
    }
  }, [onClose]);

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target && onClose) {
      onClose();
    }
  };

  return createPortal(
      <Overlay onClick={handleBackDropClick}>
        { calorie && !calorie.isLoading ? calorie.isError ? <ErrorWindow>{calorie.isError}</ErrorWindow> : (
        <ModalWindow
          onClose={onClose}
          style={
            location.pathname === routes.home && isMobile
              ? { top: '460px' }
              : null
          }
        >
          <DailyCalorieIntake
            backResponse={calorie?.items}
            userParams={userParams}
          />
          {children}
          <ButtonClose type="button" onClick={onClose}></ButtonClose>
          <CloseArrow size="20px" left="20px" onClick={onClose} />
        </ModalWindow>) : <Loading />
        }
      </Overlay>,
    modalRoot
  );
};

export default Modal;
