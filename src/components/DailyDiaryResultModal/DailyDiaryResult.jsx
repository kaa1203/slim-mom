
import { useLocation, useNavigate } from 'react-router-dom';
import css from './DailyDiaryResult.module.css'
import { routes } from '../Routes/routes.js';


export const DailyDiaryResult = ({ data, userParams }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dailyRate = data.dailyRate;
  const notAllowedProducts = data.notAllowedProducts;
  const userDataForRegister = { ...userParams, ...data };

  const calories = {
    fontSize: 15,
  };

  return (

    <div className = {css.modalWrapper} >
      <h2 className={css.title}>
        Your recommended daily<br></br> calorie intake is
      </h2>

      <h1 className={css.calorie}>
        {dailyRate}
        <span style={calories}>calories</span>
      </h1>
      <hr></hr>
      <h4 className={css.foods}>Foods you should not eat</h4>

      <ul>
        {notAllowedProducts.map((prod, index) => (
          <li className={css.listOfProd} key={index}>
            <box>
              {index + 1}. {prod}
            </box>
          </li>
        ))}
      </ul>
      {location.pathname !== routes.calculator ? (
        <button className={css.buttonWrapper}
          onClick={() =>
            navigate(routes.register, { state: { userDataForRegister } })
          }
        >
          <button className = {css.buttonForm} type="button">Start losing weight</button>
        </button>
      ) : (
        <button className ={css.buttonWrapper} onClick={() => navigate(routes.diary)}>
          <button className={css.buttonForm} type="button">Go to Diary</button>
        </button>
      )}
    </div>
  );
};
