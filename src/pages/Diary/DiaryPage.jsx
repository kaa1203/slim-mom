import css from './DiaryPage.module.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../redux/product/operations';
import { useDispatch } from 'react-redux';
import { useSearch } from '../../hooks/useSearch';
import { searchProducts } from '../../redux/product/productSlice';
import { DiaryList } from 'components/DiaryList/DiaryList';
import { fetchEntriesByDate } from '../../redux/entry/operation';
import { useGetEntry } from '../../hooks/useGetEntry';
import { DiaryModal } from 'components/DiaryModal/DiaryModal'; // Import the modal component

const debounce = (fn, duration) => {
	let timer = null;
	return function(...args) {
		if (timer) {
			clearInterval(timer);
		}
		timer = setTimeout(() => {
			fn.apply(this, args);
		}, duration)
	}
}

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
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalData, setModalData] = useState(null); // State for the data to pass to the modal

   const navigate = useNavigate();
   const location = useLocation();
	const dispatch = useDispatch();
	const { products, isLoading } = useSearch();
	const { entry } = useGetEntry();

   const getQueryParams = () => new URLSearchParams(location.search);

	useEffect(() => {
		dispatch(fetchProducts(""));
	}, [dispatch])

   const handleOnChange = e => {
      setSearchValue(e.target.value);
      const params = getQueryParams();
      params.set('q', e.target.value);
      navigate({ search: params.toString()});

		throttledSearch(e.target.value);
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

	console.log(entry);

	return (
      <>
         <input type="date" onChange={handleDateOnChange}/>
         <br />
			<div>{date}</div>
         <div className={css.searchContainer}>
            <input type="text"
               placeholder="Enter product name"
               onChange={handleOnChange}
               value={searchValue}
            />
            {searchValue &&
               <div className={css.searchResult}>
						{isLoading && <div>Loading...</div>}
						{ products && products.length > 0 ? (
						 products.map(product => (
							<DiaryList
								key={product._id}
								product={product}
							/>
						)
						)) : (
							<div>Nothing to show</div>

						)}
               </div>
            }
            <input type="text" placeholder="Gram" />

         </div>
        {/* Render the modal conditionally */}
        {isModalOpen && <DiaryModal onClose={() => setIsModalOpen(false)} data={modalData} />}
      </>
  )
}
