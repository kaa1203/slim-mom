import { Icon, Item } from '../DiaryProductListItem/DiaryProductListItem.styled';
import CrossIcon from '../../images/svg/cross.svg';
import { useDispatch } from 'react-redux';
import { deleteEntry } from '../../redux/entry/operation';

export const DiaryProductsListItem = ({_id, product}) => {
  const { title, grams, calories } = product;
  const dispatch = useDispatch();
  
  const handleDelete = () => {
    dispatch(deleteEntry(_id));	
  }	

  return (
    <Item>
      <p className="products-item-name">{title}</p>
      <p className="products-item-grams">{grams} g</p>
      <p className="products-item-calories">{calories} <span>kcal</span></p>
      <Icon src={CrossIcon} alt="delete product" onClick={handleDelete}/>
    </Item>
  )
}
