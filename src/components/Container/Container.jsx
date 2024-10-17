import React from 'react'; // Import React at the top
import s from './Container.module.css';

const Container = ({ children }) => <div className={s.container}>{children}</div>;

export default Container;
