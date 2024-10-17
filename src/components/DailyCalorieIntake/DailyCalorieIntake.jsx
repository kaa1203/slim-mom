import React from 'react'; // Ensure React is in scope
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import hooks from redux
import { getDailyIntake, getUserDailyDiet, getLoginStatus } from '../../redux/auth/authSelector'; // Correct path to selectors
import { updateModalStatus } from '../../redux/auth/authSlice'; // Correct path to authSlice
import { nanoid } from '@reduxjs/toolkit'; // Import nanoid

import s from './DailyCalorieIntake.module.css'; // Update the path if necessary

export default function DailyCalorieIntake() {
  const dispatch = useDispatch(); // Use the dispatch hook

  const isLoggedIn = useSelector(getLoginStatus); // Get login status from state
  const navigateTo = isLoggedIn ? '/diary' : '/registration'; // Determine navigation path
  const getDiet = isLoggedIn ? getUserDailyDiet : getDailyIntake; // Choose the selector based on login status
  const dailyDiet = useSelector(getDiet); // Get daily diet based on the selected function

  const productsNotAllowed = dailyDiet?.notAllowedProduct?.map(el => (
    <li key={nanoid()} className={s.item}>
      <p className={s.text}>{el.title}</p>
    </li>
  ));

  return (
    <>
      <h2 className={s.title}>Your recommended daily calorie intake is</h2>
      <p className={s.textPrimary}>
        {dailyDiet?.calories} <span className={s.textPrimarySpan}>kcal</span>
      </p>
      <p className={s.textSecondary}>Foods you should not eat</p>
      <ol className={s.list}>{productsNotAllowed}</ol>
      <NavLink
        className={s.navLink}
        to={navigateTo}
        onClick={() => {
          dispatch(updateModalStatus(false)); // Dispatch action to update modal status
        }}
      >
        Start losing weight
      </NavLink>
    </>
  );
}
