import { Box } from 'components/Box';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup';
import {
  NameInput,
  GramsInput,
  Button,
  FormWrapper,
  SearchBox,
  SearchItem,
  NameError,
  GramsError,
  SearchItemNotRecommended,
} from './DiaryAddProductForm.styled';
import AddIcon from '../../images/svg/add.svg';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetEntry } from '../../hooks/useGetEntry';
import { searchProducts } from '../../redux/product/productSlice';
import { fetchProducts } from '../../redux/product/operations';
import { useSearch } from '../../hooks/useSearch';

const schema = yup.object().shape({
//   productName: yup.string().required('Name is required field'),
  productWeight: yup
    .number('Grams must be a number')
    .typeError('Grams must be a number')
    .required('Grams is required field'),
});

const throttle = (fn, delay) => {
	let lastCall = 0;
	return function (...args) {
	  const now = new Date().getTime();
	  if (now - lastCall < delay) {
		 return;
	  }
	  lastCall = now;
	  return fn(...args);
	};
}

export const DiaryAddProductForm = ({ onClose, isModalOpened }) => {
  // const { user } = useAuth();
  // const token = user.token;
const {entry} = useGetEntry();
  const navigate = useNavigate();	
  const location = useLocation();
  const dispatch = useDispatch();
  const { products } = useSearch();

  const getQueryParams = () => new URLSearchParams(location.search);
//   const date = useSelector(selectDate);
  const mobile = useMediaQuery({ query: '(max-width: 426px)' });
  const initialValues = {
    productName: '',
    productWeight: '',
  };
  const [searchValue, setSearchValue] = useState([]);
  const [visible, setVisible] = useState(true);
  // const userInfo = useSelector(user);

useEffect(() => {
	dispatch(fetchProducts(""));
}, [dispatch]);

const handleOnChange = e => {
	const query = e.target.value;
	const params = getQueryParams();

	setSearchValue(query);
	params.set('q', query);
	navigate({ search: params.toString()});
	
	setVisible(query.length > 0);

	throttledSearch(query);
};

const throttledSearch = throttle((search) => {
	if (search !== searchValue) {
		dispatch(searchProducts(search));
	}
}, 1500);

  // const search = async value => {
  //   try {
  //     const result = await apiGetSearchProducts(value);
  //     setSearchProducts(result);
  //   } catch (error) {
  //     setSearchProducts([]);
  //   }
  // };

  // const handleSubmit = async (values, { resetForm }) => {
  //   schema.validate(values);
  //   const { productName, productWeight } = values;
  //   const body = { productName, productWeight: parseInt(productWeight) };
  //   try {
  //     const result = await apiAddMyProduct(body, token);
  //     if (result.length > 0) {
  //       dispatch(setProducts(result));
  //     } else {
  //       dispatch(setProducts([]));
  //     }
  //   } catch (error) {
  //     alert('Oops.. Product not found!');
  //   }
  //   mobile && onClose();
  //   resetForm();
  // };

  // const handleChange = e => {
  //   const productName = e.target.value;
  //   if (e.target.name === 'productName') {
  //     if (productName !== '' && productName.length > 1) {
  //       search(productName);
  //       setVisible(true);
  //     } else {
  //       setVisible(false);
  //       setSearchProducts([]);
  //     }
  //   }
  // };

  const handleClick = (setFieldValue, title) => {
    setVisible(false);
    setFieldValue('productName', title);
  };

  return (
    <Box position="relative" my="40px">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        // onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ formikProps, setFieldValue }) => (
          <Box>
            <FormWrapper >
              <NameInput
                type="productName"
                placeholder="Enter product name"
                name="productName"
                autoComplete="off"
					 value={ searchValue }
					 onChange={handleOnChange}
              />
              <ErrorMessage name="productName" component={NameError} />
              <GramsInput
                type="productWeight"
                placeholder="Grams"
                name="productWeight"
                autoComplete="off"
              />
              <ErrorMessage name="productWeight" component={GramsError} />
              {mobile ? (
                <Button type="submit">Add</Button>
              ) : (
                <Button type="submit">
                  <img src={AddIcon} alt="add product" />
                </Button>
              )}
            </FormWrapper>
            <SearchBox className={visible ? 'visible' : null}>
              {/* {searchProducts !== '' &&
                searchProducts.length !== 0 &&
                searchProducts.map(product => {
                  if (
                    userInfo.notAllowedProductsAll.find(
                      el => el === product.title
                    )
                  ) {
                    return (
                      <SearchItemNotRecommended
                        key={product._id}
                        onClick={() =>
                          handleClick(setFieldValue, product.title)
                        }
                      >
                        {product.title}
                      </SearchItemNotRecommended>
                    );
                  }
                  return (
                    <SearchItem
                      key={product._id}
                      onClick={() => handleClick(setFieldValue, product.title)}
                    >
                      {product.title}
                    </SearchItem>
                  );
                })} */}
            </SearchBox>
          </Box>
        )}
      </Formik>
    </Box>
  );
};
