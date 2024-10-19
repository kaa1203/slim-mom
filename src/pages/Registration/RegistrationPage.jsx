import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Input, List } from 'components/Form/Form.styled';
import { Button } from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';
//prettier-ignore
import { ButtonWrapper, H2, Wrapper } from '../../components/RegisterPage/RegisterPage.styled';
import { WrapperWithFruits } from 'components/RegisterPage/RegisterPage.styled';
import { routes } from 'components/Routes/routes';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;

    const data = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      password: form.elements.password.value,
    };

    dispatch(signup(data));
    form.reset();
  };
  const handleClick = () => {
    navigate(routes.login);
  };
  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <WrapperWithFruits>
      <Wrapper>
        <H2>Register</H2>
        <form onSubmit={handleSubmit}>
          <List style={{ display: 'grid', gridTemplateColumns: 'revert' }}>
            <li>
              <label>
                <Input type="name" name="name" placeholder="Name *" />
                {/* <ErrorMessage name="name" component={Error} /> */}
              </label>
            </li>

            <li>
              <label>
                <Input type="email" name="email" placeholder="Email *" />
                {/* <ErrorMessage name="email" component={Error} /> */}
              </label>
            </li>

            <li>
              <label style={{ position: 'relative' }}>
                <Input
                  type={isShowPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password *"
                  maxLength="16"
                />
                {isShowPassword ? (
                  <AiFillEyeInvisible
                    onClick={handleShowPassword}
                    style={{
                      position: 'absolute',
                      top: '0px',
                      left: '250px',
                      color: '#FC842D',
                    }}
                  />
                ) : (
                  <AiFillEye
                    onClick={handleShowPassword}
                    style={{
                      position: 'absolute',
                      top: '0px',
                      left: '250px',
                      color: '#FC842D',
                    }}
                  />
                )}
                {/* <ErrorMessage name="password" component={Error} /> */}
              </label>
            </li>
          </List>
          <ButtonWrapper>
            <Button type="submit" full={true} style={{ width: '200px' }}>
              Register
            </Button>
            <div onClick={handleClick}>
              <Button type="button" full={false}>
                Log In
              </Button>
            </div>
          </ButtonWrapper>
        </form>
      </Wrapper>
    </WrapperWithFruits>
  );
};

export { RegistrationPage };
