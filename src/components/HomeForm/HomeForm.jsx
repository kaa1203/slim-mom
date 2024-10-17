import css from './HomeForm.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { caloriePublic, caloriePrivate } from '../../redux/calorie/operations';
import { useAuth } from '../../hooks/useAuth';
import { useGetCalorieIntake } from '../../hooks/useGetCalorieIntake';
import { DiaryModal } from '../DiaryModal/DiaryModal';

export const HomeForm = () => {
	const [selectedRadio, setSelectedRadio] = useState(1);
  const [response, setResponse] = useState();

	const dispatch = useDispatch();
	const { isLoggedIn } = useAuth();
	const { result } = useGetCalorieIntake();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

	const radios = [
		{ id: 1, label: 'radioOne'},
		{ id: 2, label: 'radioTwo'},
		{ id: 3, label: 'radioThree'},
		{ id: 4, label: 'radioFour'},
	];

	const handleOnChange = e => {
		setSelectedRadio(Number(e.target.value));
  }

	const handleOnSubmit = async(e) =>  {
		e.preventDefault();
		const form = e.target;
		const data = {
			height: form.elements.height.value,
			age: form.elements.age.value,
			currentWeight: form.elements.currentWeight.value,
			desiredWeight: form.elements.desiredWeight.value,
			bloodType: form.elements.bloodType.value,
		}
		if (isLoggedIn) return dispatch(caloriePrivate(data));

		const resp = await dispatch(caloriePublic(data));
    console.log(resp)
    setResponse(resp)
    setIsModalOpen(true);
		form.reset();
	}
	console.log(result);
	return (
		<div className={css.formContainer}>
			<h1 className={css.title}>
				Calculate your daily calorie intake right now
			</h1>
			<form className={css.form} onSubmit={handleOnSubmit}>
				<div className={css.inputContainer}>
					<label className={css.label}>
						Height *
						<input type='number' className={css.input} name='height' autoComplete='false'/>
					</label>
					<label className={css.label}>
						Desired weight *
						<input type='number' className={css.input} name='desiredWeight' autoComplete='false'/>
					</label>
					<label className={css.label}>
						Age *
						<input type='number' className={css.input} name='age' autoComplete='false'/>
					</label>
					<div className={css.bloodTypeContainer}>
						<span className={css.label}>Blood type *</span>
						<div className={css.radioContainer}>
							{
								radios.map(radio => (
									<label
										className={css.label}
										key={radio.label}
									>
										<input
											type='radio'
											className={css.radio}
											name='bloodType'
											id={radio.id}
											value={radio.id}
											checked={ selectedRadio === radio.id }
											onChange={ handleOnChange }
										/>
										<span>{radio.id}</span>
									</label>
								))
							}
						</div>
					</div>
					<label className={css.label}>
						Current weight *
						<input type='number' className={css.input} name='currentWeight' autoComplete='false'/>
					</label>
				</div>
				<button type='submit' className={css.button}>Start losing weight</button>
			</form>

      {isModalOpen && <DiaryModal onClose={closeModal} data={response} />}
		</div>
	);
}
