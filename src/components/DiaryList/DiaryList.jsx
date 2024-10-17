
export const DiaryList = ({ product, setSearchValue, setShowDD, setProductDetails }) => {
	
	const handleOnClick = () => {
		setSearchValue(product.title);
		setShowDD(false);
		setProductDetails(product);
	}

	return (
		<div onClick={handleOnClick}>
			{product.title}
		</div>
	);
}