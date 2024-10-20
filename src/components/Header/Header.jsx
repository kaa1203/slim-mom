import logoMobile from '../../images/logo/logoMobile.png';
import logoMobileRetina from '../../images/logo/logoMobile@2x.png';
import logoTablet from '../../images/logo/logoTablet.png';
import logoTabletRetina from '../../images/logo/logoTablet@2x.png';
import logoDesktop from '../../images/logo/logoDesktop.png';
import logoDesktopRetina from '../../images/logo/logoDesktop@2x.png';
import { useMediaQuery } from 'react-responsive';
import React, { useState } from 'react';
import { BtnList, HeaderStyled, Logo, StyledLink } from './Header.styled';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import { BottomSection } from './UserInfo/UserInfo';
import { Menu } from './Navigation/Navigation';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const { user } = useAuth();
  const userName = user?.name || '';

  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1023px)',
  });
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
  const takeLogo = () => {
    if (isRetina) {
      if (isMobile) {
        return logoMobileRetina;
      } else if (isTablet) {
        return logoTabletRetina;
      } else if (isDesktop) {
        return logoDesktopRetina;
      }
    } else {
      if (isMobile) {
        return logoMobile;
      } else if (isTablet) {
        return logoTablet;
      } else if (isDesktop) {
        return logoDesktop;
      }
    }
  };

  return (
    <>
      <HeaderStyled>
        <Link to={'/'}>
          <Logo src={takeLogo()} />
        </Link>

        {userName ? (
          <>
            {isTablet && <BottomSection name={userName} />}
            {isDesktop && (
              <>
                <Menu setOpenNavigation={setOpenNavigation} />
                <BottomSection name={userName} />
              </>
            )}
            {!isDesktop && (
              <>
                {openNavigation ? (
                  <RxCross2
                    style={{
                      width: '24px',
                      height: '24px',
                      color: 'black',
                    }}
                    onClick={() => setOpenNavigation(false)}
                  />
                ) : (
                  <GiHamburgerMenu
                    style={{
                      width: '24px',
                      height: '24px',
                      color: 'black',
                    }}
                    onClick={() => {
                      setOpenNavigation(true);
                    }}
                  />
                )}
                {openNavigation && (
                  <Menu setOpenNavigation={setOpenNavigation} />
                )}
              </>
            )}
          </>
        ) : (
          <BtnList>
            <li>
              <StyledLink to="login">Log in</StyledLink>
            </li>
            <li>
              <StyledLink to="registration">Registration</StyledLink>
            </li>
          </BtnList>
        )}
      </HeaderStyled>
      {isMobile && userName && <BottomSection name={userName} />}
    </>
  );
};

export { Header };
