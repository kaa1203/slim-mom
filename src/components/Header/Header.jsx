import React, { useState } from 'react';
import logo from '../../images/slim-mom logo.png';
import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';

const Header = () => {
  const { isLoggedIn, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogOut = e => {
    dispatch(logout());
  }
  return (
    <header className={css.header}>
      <div className={css.leftSection}>
        <div className={css.logo}>
			 <NavLink 
			 	to="/"
			 > 
          	<img src={logo} alt="logo" />
			 </NavLink>
        </div>

        {/* Desktop and Tablet Navigation */}
        <nav className={css.nav}>
          {' '}
          {isLoggedIn ? (
            <>
              <NavLink
                to="/diary"
                className={({ isActive }) => (isActive ? css.active : css.inactive)}
              >
                 Diary
              </NavLink>
              <NavLink
                to="/calculator"
                className={({ isActive }) => (isActive ? css.active : css.inactive)}
              >
                Calculator
              </NavLink>
            </>
          ) : (
            <div className={css.nav2}>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? css.active : css.inactive)}
              >
					 Log in
              </NavLink>
              <NavLink
                to="/registration"
                className={({ isActive }) => (isActive ? css.active : css.inactive)}
              >
                Registration
              </NavLink>
            </div>
          )}
        </nav>
      </div>

      <div className={css.rightSection}>
        {isLoggedIn ? (
          <>
            <span>{user.name}</span> |<div onClick={handleLogOut}>Exit</div>
            <button className={css.burger} onClick={toggleMenu}>
              <span className={css.burgerIcon}></span>
            </button>
          </>
        ) : null}
      </div>

      {/* Collapsible Menu for Mobile View (only when logged in) */}
      {isLoggedIn && menuOpen && (
        <nav className={css.collapsibleMenu}>
          <NavLink
            to="/diary"
            className={({ isActive }) => (isActive ? css.active : css.inactive)}
          >
            | Diary
          </NavLink>
          <NavLink
            to="/calculator"
            className={({ isActive }) => (isActive ? css.active : css.inactive)}
          >
            Calculator
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;
