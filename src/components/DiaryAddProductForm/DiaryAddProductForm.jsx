import { Box } from 'components/Box';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  FormWrapper,
  GramsError,
  GramsInput,
  NameError,
  NameInput,
  SearchBox,
} from './DiaryAddProductForm.styled';
import AddIcon from '../../images/svg/add.svg';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchProducts } from '../../redux/product/productSlice';
import { fetchProducts } from '../../redux/product/operations';
import { useSearch } from '../../hooks/useSearch';
import { DiarySearchItem } from 'components/DiarySearch/DiarySearchItem';
import { addEntry } from '../../redux/entry/operation';

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
  const [visible, setVisible] = useState(false);
  const [productDetails, setProductDetails] = useState('');
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

const handleSubmit = (values) => {
	const { productWeight } = values;
	const grams = productWeight;
	const data = { ...productDetails, grams }
	dispatch(addEntry(data));
}

  return (
    <Box style={{position:'relative'}}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ formikProps, setFieldValue }) => (
          <Box>
            <FormWrapper>
              <NameInput
                type="text"
                placeholder="Enter product name"
                name="productName"
                autoComplete="off"
					 value={ searchValue }
					 onChange={handleOnChange}
              />
              <ErrorMessage name="productName" component={NameError} />
              <GramsInput
                type="number"
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
				{ visible &&
					<SearchBox>
						{ products && products.length > 0 ? (
						 products.map(product => (
							<DiarySearchItem 
								key={product._id}
								product={product}
								setSearchValue={setSearchValue}
								setVisible={setVisible}
								setProductDetails={setProductDetails}
							/>
						)
						)) : (
							<div>Nothing to show</div>

						)}
					</SearchBox>
				}
          </Box>
        )}
      </Formik>
    </Box>
  );
};
