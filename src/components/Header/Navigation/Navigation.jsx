import React from 'react';
import { Nav, StyledLink } from './Navigation.styled';

export const Menu = ({ setOpenNavigation }) => {
  const handleClick = () => {
    setOpenNavigation(false);
  };
  return (
    <Nav>
      <StyledLink to="calculator" onClick={handleClick}>
        Calculator
      </StyledLink>
      <StyledLink to="diary" onClick={handleClick}>
        Diary
      </StyledLink>
    </Nav>
  );
};
