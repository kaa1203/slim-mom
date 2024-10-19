import css from './Background.module.css';

export const Background = () => {
	return (
		<div className={css.background}>
			<div className={css.banana} />
			<div className={css.greyThingy} />
			<div className={css.grass} />
			<div className={css.strawberry} />
		</div>
	);
}
