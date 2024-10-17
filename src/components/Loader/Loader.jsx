import React from 'react'; // Import React to be in scope
import PropTypes from 'prop-types';
import Spinner from 'react-spinners/CircleLoader';
import s from '../Loader/Loader.module.css';

export default function Loader({ size = 150 }) {
  return (
    <div className={s.loader}>
      <Spinner
        color="#ff9406"
        loading
        size={size}
        aria-label="Loading Spinner"
        speedMultiplier={0.7}
      />
    </div>
  );
}

Loader.propTypes = {
  size: PropTypes.number, // Updated to match prop usage
};
