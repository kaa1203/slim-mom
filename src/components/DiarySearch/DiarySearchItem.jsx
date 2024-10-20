export const DiarySearchItem = ({ product, setSearchValue, setVisible, setProductDetails }) => {
	
	const handleOnClick = () => {
		setSearchValue(product.title);
		setVisible(false);
		setProductDetails(product);
	}

	return (
		<li onClick={handleOnClick}>
			{product.title}
		</li>
	);
}