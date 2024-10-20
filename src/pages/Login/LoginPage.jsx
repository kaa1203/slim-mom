import React, { useState } from 'react';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Input, List } from '../../components/Form/Form.styled';
import { Button } from '../../components/Button/Button';

import {
  ButtonWrapper,
  H2,
  Wrapper,
  WrapperWithFruits,
} from '../../components/RegisterPage/RegisterPage.styled';

import { signin } from '../../redux/auth/operations';

import { routes } from '../../components/Routes/routes';

// const schema = yup.object().shape({
//   email: yup.string().email().required('Email is required field'),
//   password: yup
//     .string()
//     .min(6, 'Password must be more than or equal to 6 letters')
//     .max(16, 'Pame must be more than or equal to 16 letters')
//     .required('Password is required field'),
// });

// const initialValues = {
//   email: '',
//   password: '',
// };

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    dispatch(
      signin({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  const handleClick = () => {
    navigate(routes.registration);
  };
  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <WrapperWithFruits>
      <Wrapper style={{ paddingBottom: '255px' }}>
        <H2>Log In</H2>
        <form onSubmit={handleSubmit}>
          <List style={{ display: 'grid', gridTemplateColumns: 'revert' }}>
            <li>
              <label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  autoComplete="off"
                />
                {/* <ErrorMessage name="email" component={Error} />
                  {<Error>Email or password is wrong</Error>} */}
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
                {/* <ErrorMessage name="password" component={Error} />
                  {<Error>Email or password is wrong</Error>} */}
              </label>
            </li>
          </List>
          <ButtonWrapper>
            <Button type="submit" full={true} style={{ width: '200px' }}>
              Log In
            </Button>
            <div onClick={handleClick}>
              <Button type="button" full={false}>
                Register
              </Button>
            </div>
          </ButtonWrapper>
        </form>
      </Wrapper>
    </WrapperWithFruits>
  );
};

export { LoginPage };
