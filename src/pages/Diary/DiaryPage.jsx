import css from './DiaryPage.module.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../redux/product/operations';
import { useDispatch } from 'react-redux';
import { useSearch } from '../../hooks/useSearch';
import { searchProducts } from '../../redux/product/productSlice';
import { DiaryList } from 'components/DiaryList/DiaryList';
import { fetchEntriesByDate, addEntry } from '../../redux/entry/operation';
// import { useGetEntry } from '../../hooks/useGetEntry';

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

export const DiaryPage = () => {
   const [searchValue, setSearchValue] = useState('');
	const [date, setDate] = useState('');
	const [showDD, setShowDD] = useState(false);
	const [productDetails, setProductDetails] = useState('');

   const navigate = useNavigate();	
   const location = useLocation();
	const dispatch = useDispatch();
	const { products } = useSearch();
	// const { entry } = useGetEntry();
	
   const getQueryParams = () => new URLSearchParams(location.search);

	useEffect(() => {
		dispatch(fetchProducts(""));
	}, [dispatch])

   const handleOnChange = e => {
		const query = e.target.value;
      const params = getQueryParams();

		setSearchValue(query);
      params.set('q', query);
      navigate({ search: params.toString()});
		
		setShowDD(query.length > 0);

		throttledSearch(query);
   };

	const throttledSearch = throttle((search) => {
		if (search !== searchValue) {
			dispatch(searchProducts(search));
		}
	}, 1500);

	const handleDateOnChange = e => {
		setDate(e.target.value);
		dispatch(fetchEntriesByDate(e.target.value));
	}

	const handleOnSubmit = e => {
		e.preventDefault();
		const form = e.target;
		const grams = form.elements.grams.value;
		const data = {...productDetails, grams};
		dispatch(addEntry(data));
		setProductDetails('');
		form.reset();
	}

	return (
      <>
         <input type="date" onChange={handleDateOnChange}/>
         <br />
			<div>{date}</div>
         <form 
				className={css.searchForm}
				onSubmit={handleOnSubmit}
			>
            <input type="text" 
               placeholder="Enter product name" 
               onChange={handleOnChange}
               value={searchValue}
            />
            {showDD &&
               <div className={css.searchResult}>
						{ products && products.length > 0 ? (
						 products.map(product => (
							<DiaryList 
								key={product._id}
								product={product}
								setSearchValue={setSearchValue}
								setShowDD={setShowDD}
								setProductDetails={setProductDetails}
							/>
						)
						)) : (
							<div>Nothing to show</div>

						)}
               </div>
            }
				<input type='number' name='grams' placeholder='grams' />
            <button>+</button>
         </form>
      </>
   )
}