import { RingLoader } from 'react-spinners';
import css from './Loader.module.css';

export const LoaderNew = () => {
  return (
    <div className={css.container}>
      <RingLoader color="#FFA500" size={100} />
    </div>
  );
};
