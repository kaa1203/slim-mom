import {
  Wrapper,
  SummaryWrap,
  FoodWrap,
  Title,
  Item,
  Text,
  RedText,
} from '../RightSideBar/RightSideBar.styled';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useGetEntry } from '../../hooks/useGetEntry';
import { fetchAllCalculations } from '../../redux/calorie/operations';
import { useGetCalorieIntake } from '../../hooks/useGetCalorieIntake';

export const RightSideBar = () => {
  const today = new Date();
  const calendar = document.querySelector('#calendar');
  const now = `${today.getDate().toString().padStart(2, '0')}.${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${today.getFullYear()}`;
  const dispatch = useDispatch();

  const { totalCalories } = useGetEntry();
  const { calculation } = useGetCalorieIntake();

  useEffect(() => {
    dispatch(fetchAllCalculations());
  }, [dispatch, now]);

  const date = calendar?.textContent || now;
  const dailyRate = calculation?.calorieIntake || 0;
  const foodsToAvoid = calculation?.foodsToAvoid || [];
  const leftCalories = dailyRate - totalCalories;
  const nOfNorm = (totalCalories / dailyRate) * 100;

  return (
    <Wrapper>
      <SummaryWrap>
        <Title>Summary for {date}</Title>
        <ul>
          <Item>
            <Text>Left</Text>
            <Text>{leftCalories} kcal</Text>
          </Item>
          <Item>
            <Text>Consumed</Text>
            <Text>{totalCalories} kcal</Text>
          </Item>
          <Item>
            <Text>Daily rate</Text>
            <Text>{dailyRate} kcal</Text>
          </Item>
          <Item>
            <Text>n% of normal</Text>

            {nOfNorm > 100 ? (
              <RedText>{nOfNorm.toFixed(2)} %</RedText>
            ) : (
              <Text>{nOfNorm.toFixed(2)} %</Text>
            )}
          </Item>
        </ul>
      </SummaryWrap>
      <FoodWrap>
        <Title>Food not recommended</Title>
        {foodsToAvoid ? (
          <ul>
            {foodsToAvoid.map((prod, index) => (
              <Text key={index}>
                {index + 1}. {prod}
              </Text>
            ))}
          </ul>
        ) : (
          <Text>Your diet will be displayed here</Text>
        )}
      </FoodWrap>
    </Wrapper>
  );
};
