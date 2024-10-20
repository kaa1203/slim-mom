import React, { forwardRef, useEffect, useState } from 'react';
import { DatePickerWrapper, Icon } from './DiaryDateCalendar.styled';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import CalendarIcon from '../../images/svg/calendar.svg';
import { useDispatch } from 'react-redux';
import { fetchEntriesByDate } from '../../redux/entry/operation';
import moment from 'moment';

export const DiaryDateCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch()
  
  useEffect(() => {
	const today = new Date();
	const formattedDate = moment(today).format("YYYY-MM-DD")
    dispatch(fetchEntriesByDate(formattedDate))
  }, [dispatch])

  const handleChange = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD")
    setSelectedDate(date);
    dispatch(fetchEntriesByDate(formattedDate))
  }

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div>
      <DatePickerWrapper onClick={onClick} ref={ref} id="calendar">
        {value}
        <Icon src={CalendarIcon} alt="calendar icon" />
      </DatePickerWrapper>
    </div>
  ));

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => handleChange(date)}
        dateFormat="dd.MM.yyyy"
        customInput={<ExampleCustomInput />}
        maxDate={new Date()}
      />
    </div>
  )
}
