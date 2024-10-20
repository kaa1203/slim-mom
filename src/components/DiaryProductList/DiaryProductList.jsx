import { List } from '../DiaryProductList/DiaryProductlist.styled';
import { useGetEntry } from '../../hooks/useGetEntry';
import { DiaryProductsListItem } from 'components/DiaryProductListItem/DiaryProductListItem';

export const DiaryProductsList = () => {
  const { entry } = useGetEntry();

  return (
    <List>
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
      {entry
        .slice()
        .reverse()
        .map(product => {
          return (
            <DiaryProductsListItem
              key={product._id}
              _id={product._id}
              product={product.food}
            />
          );
        })}
    </List>
  );
};
