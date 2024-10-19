// import { getToken } from 'redux/authSelectors';
// import { getProducts, selectDate } from 'redux/productsSelectors';
// import { setProducts } from 'redux/productsSlice';
import { List } from '../DiaryProductList/DiaryProductlist.styled';
// import { ThemeContext } from 'components/Context/Context';
// import { apiListMyProducts } from 'services/api/api';

export const DiaryProductsList = () => {
  // const { isChristmas } = useContext(ThemeContext);
  // const mobile = useMediaQuery({ query: '(max-width: 426px)' });
  // const token = useSelector(getToken);
  // const date = useSelector(selectDate);
  // const dispatch = useDispatch();
  // const { items } = useSearch();
  // const products = items;
  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const result = await apiListMyProducts(date, token)
  //       if (result.length > 0) {
  //         dispatch(setProducts(result[0].productInfo));
  //       } else {
  //         dispatch(setProducts([]));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getProducts();
  // }, [date, dispatch, token]);

  return (
    <List >
      {/* className={products.length > 4 ? null : "hidden"} */}
      {/* {products.length !== 0 ? (
        products.map(product => {
          return (
            <DiaryProductsListItem
              key={product._id}
              id={product._id}
              name={product.productName}
              grams={product.productWeight}
              calories={product.productCalories}
            />
          );
        })
      ) : (
        <NoProductsContainer>
          {!mobile && <HiArrowUp
            style={{
              width: '64px',
              height: '64px',
              color: 'black',
            }}
          />}
          <p
            style={{
              color: 'black',
            }}
          >
            Let's add some products!
          </p>
          {mobile && <HiArrowUp
            style={{
              width: '64px',
              height: '64px',
              color: 'black',
            }}
          />}
        </NoProductsContainer>
      )} */}
    </List>
  );
};
