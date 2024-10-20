import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup';
import { useMediaQuery } from 'react-responsive';
import { searchProducts } from '../../redux/product/productSlice';
import { fetchProducts } from '../../redux/product/operations';
import { addEntry } from '../../redux/entry/operation';
import { useSearch } from '../../hooks/useSearch';
import { Box } from 'components/Box';
import { DiarySearchItem } from 'components/DiarySearch/DiarySearchItem';
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

// Pop-up message component
const PopupMessage = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Hide after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Box
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#28a745',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
        zIndex: 1000,
      }}
    >
      {message}
    </Box>
  );
};

const schema = yup.object().shape({
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
};

export const DiaryAddProductForm = ({ onClose, isModalOpened }) => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useDispatch();
  const { products } = useSearch();

  const mobile = useMediaQuery({ query: '(max-width: 426px)' });
  const initialValues = {
    productName: '',
    productWeight: '',
  };

  const [searchValue, setSearchValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [productDetails, setProductDetails] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  useEffect(() => {
    dispatch(fetchProducts(''));
  }, [dispatch]);

  const handleOnChange = e => {
    const query = e.target.value;
    setSearchValue(query);
    setVisible(query.length > 0);
    throttledSearch(query);
  };

  const throttledSearch = throttle(search => {
    dispatch(searchProducts(search));
  }, 1500);

  const handleSubmit = values => {
    const { productWeight } = values;
    const grams = productWeight;
    const data = { ...productDetails, grams };
    dispatch(addEntry(data));

    // Show the popup after adding an entry
    setShowPopup(true);
  };

  return (
    <Box style={{ position: 'relative' }}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {() => (
          <Box>
            <FormWrapper>
              <NameInput
                type="text"
                placeholder="Enter product name"
                name="productName"
                autoComplete="off"
                value={searchValue}
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
            {visible && (
              <SearchBox>
                {products && products.length > 0 ? (
                  products.map(product => {
                    const isHighlighted =
                      searchValue.toLowerCase() ===
                      product?.title?.toLowerCase(); // Highlight matching product

                    return (
                      <DiarySearchItem
                        key={product._id}
                        product={product}
                        setSearchValue={setSearchValue}
                        setVisible={setVisible}
                        setProductDetails={setProductDetails}
                        style={{
                          backgroundColor: isHighlighted ? '#ffeb3b' : 'grey',
                        }} // Apply different background if matched
                      />
                    );
                  })
                ) : (
                  <div>Nothing to show</div>
                )}
              </SearchBox>
            )}
          </Box>
        )}
      </Formik>

      {showPopup && (
        <PopupMessage
          message="You just added an item"
          onClose={() => setShowPopup(false)}
        />
      )}
    </Box>
  );
};
