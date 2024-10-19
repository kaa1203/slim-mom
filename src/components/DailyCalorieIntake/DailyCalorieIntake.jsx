import { routes } from 'components/Routes/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { BOX, ButtonForm, ButtonWrapper, H1, H2, H4, LI, ModalWrapper } from './DailyCalorieIntake.styled';


const DailyCalorieIntake = ({ backResponse, userParams }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const result = useSelector(selectCalorie);
  // console.log(result);
  const dailyRate = backResponse?.calorieIntake ?? 'N/A'; // Default to 'N/A' if null or undefined
  const notAllowedProducts = backResponse?.foodsToAvoid ?? []; // Default to an empty array if null or undefined
  const userDataForRegister = { ...userParams, ...backResponse };

  const calories = {
    fontSize: 15,
  };

  return (
    <ModalWrapper>
      <H2>
        Your recommended daily<br></br> calorie intake is
      </H2>

      <H1>
        {dailyRate}
        <span style={calories}>calories</span>
      </H1>
      <hr></hr>
      <H4>Foods you should not eat</H4>

      <ul>
        {notAllowedProducts.map((prod, index) => (
          <LI key={index}>
            <BOX>
              {index + 1}. {prod}
            </BOX>
          </LI>
        ))}
      </ul>
      {location.pathname !== routes.calculator ? (
        <ButtonWrapper
          onClick={() =>
            navigate(routes.registration, { state: { userDataForRegister } })
          }
        >
          <ButtonForm type="button">Start losing weight</ButtonForm>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper onClick={() => navigate(routes.diary)}>
          <ButtonForm type="button">Go to Diary</ButtonForm>
        </ButtonWrapper>
      )}
    </ModalWrapper>
  );
};
export default DailyCalorieIntake;
