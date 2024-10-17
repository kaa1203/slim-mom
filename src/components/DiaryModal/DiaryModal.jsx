import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Overlay } from '../Overlay/Overlay.jsx';
// import css from './DiaryModal.module.css';
import { DailyDiaryResult } from '../DailyDiaryResultModal/DailyDiaryResult';
import { BackBtn } from '../Button/BackBtn.jsx';


const modalRoot = document.querySelector('#modal-root');

export const DiaryModal = ({ onClose, data }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <Overlay>
      <div>
        <BackBtn onClick={onClose}> ← </BackBtn>
        <DailyDiaryResult onClose={onClose} data={data} />
      </div>
      </Overlay>,
    modalRoot
  )
};
