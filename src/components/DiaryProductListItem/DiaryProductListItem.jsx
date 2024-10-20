import { Icon, Item } from '../DiaryProductListItem/DiaryProductListItem.styled';
import CrossIcon from '../../images/svg/cross.svg';
// import { getToken } from "redux/authSelectors";
import { useDispatch } from 'react-redux';
import { useGetEntry } from '../../hooks/useGetEntry';
// import { setProducts } from "redux/productsSlice";
// import { apiDeleteMyProduct } from "services/api/api";

export const DiaryProductsListItem = ({id, name, grams, calories}) => {
  // const date = useSelector(selectDate)
  const { items } = useGetEntry();
  console.log(items);
  const dispatch = useDispatch()
  // const token = useSelector(getToken)
  // const handleDelete = async (id) => {
  //   try {
  //     const result = await apiDeleteMyProduct(id, token, date)
  //     dispatch(setProducts(result))
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <Item>
      <p className="products-item-name">{name}</p>
      <p className="products-item-grams">{grams} g</p>
      <p className="products-item-calories">{calories} <span>kcal</span></p>
      <Icon src={CrossIcon} alt="delete product" onClick/>
    </Item>
  )
}
