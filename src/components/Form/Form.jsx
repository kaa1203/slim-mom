import React, { useState } from 'react';
// import { Formik, ErrorMessage, Form } from 'formik';
import { useMediaQuery } from 'react-responsive';
// import * as yup from 'yup';
import { Box } from 'components/Box';
import { ButtonForm } from './Form.styled';
import {
  ButtonWrapper,
  Checkbox,
  CheckboxContainer,
  // Error,
  Input,
  Label,
  List,
  Paragraph,
} from './Form.styled';
import { useDispatch } from 'react-redux';
// import { selectIsLoggedIn, selectToken } from '../../redux/auth/selectors';
import { caloriePrivate, caloriePublic } from '../../redux/calorie/operations';
import { useAuth } from 'hooks/useAuth';

export const WeightForm = ({ openModal, setUserParams, initialValues }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 554px)' });
  // const isLogged = useSelector(selectIsLoggedIn);
  const { isLoggedIn } = useAuth();
  // const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [bloodType, setBloodType] = useState('1'); // State to manage selected radio button

  // const startValues = {
  //   height: '',
  //   age: '',
  //   currentWeight: '',
  //   desiredWeight: '',
  //   bloodType: '1',
  // };

  const handleSubmit = e => {
    e.preventDefault();
    openModal(true);
    const form = e.target;
    const data = {
      height: form.elements.height.value,
      age: form.elements.age.value,
      currentWeight: form.elements.currentWeight.value,
      desiredWeight: form.elements.desiredWeight.value,
      bloodType: form.elements.bloodType.value,
    };
    setUserParams(data);
    if (isLoggedIn) dispatch(caloriePrivate(data));

    if (
      !data.height ||
      !data.age ||
      !data.currentWeight ||
      !data.desiredWeight ||
      !data.bloodType
    ) {
      alert('Please fill in all the required fields.');
      return; // Prevent form submission if any field is empty
    }
    dispatch(caloriePublic(data));
    form.reset();
    // const params = { ...values };
    // // schema.validate(params);
    // setUserParams(params);
    // // saveInStor('params', params);

    // if(isLogged) {
    //   const {height, age, currentWeight, desiredWeight, bloodType} = params
    //   const data = await apiCalorieIntake(params);
    //   if (data) {
    //     const {dailyRate, notAllowedProducts, notAllowedProductsAll} = data
    //     const body = {height, age, currentWeight, desiredWeight, bloodType, dailyRate, notAllowedProducts, notAllowedProductsAll}
    //     await apiUpdateInfoUser(token, body)
    //     dispatch(setInfoUser(body))
    //   }
    // }
  };

  return (
    <Box>
      {/* <Formik
        initialValues={initialValues ? initialValues : startValues}
        onSubmit={handleSubmit}
        // validationSchema={schema}
      >
        <Form> */}
      <form onSubmit={handleSubmit}>
        <List>
          <li
            style={
              isMobile
                ? null
                : {
                    gridColumnStart: '1',
                    gridColumnEnd: '1',
                    gridRowStart: '1',
                    gridRowEnd: '1',
                  }
            }
          >
            <label>
              <Input type="height" name="height" placeholder="Height, cm *" />
              {/* <ErrorMessage name="height" component={Error} /> */}
            </label>
          </li>

          <li
            style={
              isMobile
                ? null
                : {
                    gridColumnStart: '1',
                    gridColumnEnd: '1',
                    gridRowStart: '2',
                    gridRowEnd: '2',
                  }
            }
          >
            <label>
              <Input type="age" name="age" placeholder="Age *" />
              {/* <ErrorMessage name="age" component={Error} /> */}
            </label>
          </li>

          <li
            style={
              isMobile
                ? null
                : {
                    gridColumnStart: '1',
                    gridColumnEnd: '1',
                    gridRowStart: '3',
                    gridRowEnd: '3',
                    position: 'relative',
                    top: '-20px',
                  }
            }
          >
            <label>
              <Input
                type="currentWeight"
                name="currentWeight"
                placeholder="Current weight, kg *"
              />
              {/* <ErrorMessage name="currentWeight" component={Error} /> */}
            </label>
          </li>

          <li>
            <label>
              <Input
                type="desiredWeight"
                name="desiredWeight"
                placeholder="Desired weight, kg *"
              />
              {/* <ErrorMessage name="desiredWeight" component={Error} /> */}
            </label>
          </li>

          <li>
            <Paragraph>Blood type *</Paragraph>
            <CheckboxContainer role="group" aria-labelledby="my-radio-group">
              <Label>
                <Checkbox
                  type="radio"
                  name="bloodType"
                  value="1"
                  checked={bloodType === '1'}
                  onChange={() => setBloodType('1')}
                />
                1
              </Label>
              <Label>
                <Checkbox
                  type="radio"
                  name="bloodType"
                  value="2"
                  checked={bloodType === '2'}
                  onChange={() => setBloodType('2')}
                />
                2
              </Label>
              <Label>
                <Checkbox
                  type="radio"
                  name="bloodType"
                  value="3"
                  checked={bloodType === '3'}
                  onChange={() => setBloodType('3')}
                />
                3
              </Label>
              <Label>
                <Checkbox
                  type="radio"
                  name="bloodType"
                  value="4"
                  checked={bloodType === '4'}
                  onChange={() => setBloodType('4')}
                />
                4
              </Label>
            </CheckboxContainer>
          </li>
        </List>
        <ButtonWrapper disabled={!initialValues}>
          <ButtonForm type="submit">Start losing weight</ButtonForm>
        </ButtonWrapper>
      </form>
    </Box>
  );
};
