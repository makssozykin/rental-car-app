import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { Button } from '../../components/Button/Button.jsx';
import css from './BookForm.module.css';

export const BookForm = () => {
  const [startDate, setStartDate] = useState(null);
  const schema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    date: Yup.string().nullable(),
    comment: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      date: null,
      comment: '',
    },
  });

  const handleDateChange = date => {
    setStartDate(date);
    setValue('date', date);
  };

  const handleBookingFormSubmit = () => {
    toast.success('You have booked the car successfully!');
    setStartDate(null);
    setValue('date', null);
    reset();
  };

  const isToday = date => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getDayClassName = date => {
    let className = css.datePickerDay;
    if (isToday(date)) {
      className = `${className} ${css.datePickerDayToday}`;
    }
    return className;
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleBookingFormSubmit)}
        className={css.bookingForm}
      >
        <h3>Book your car now</h3>
        <p>Stay connected! We are always ready to help you.</p>
        <div className={css.formInputs}>
          <input
            className={css.formInput}
            type="text"
            {...register('name')}
            placeholder="Name*"
            autoComplete="off"
          />
          {errors.name && (
            <span className={css.errorName}>{errors.name.message}</span>
          )}
          <input
            className={css.formInput}
            type="email"
            {...register('email')}
            placeholder="Email*"
            autoComplete="off"
          />
          {errors.email && (
            <span className={css.errorEmail}>{errors.email.message}</span>
          )}
          <DatePicker
            className={css.calendar}
            calendarClassName={css.datePickerCalendar}
            dayClassName={getDayClassName}
            popperClassName={css.datePickerPopper}
            {...register('date')}
            selected={startDate}
            minDate={new Date()}
            onChange={handleDateChange}
            placeholderText="Booking date"
            dateFormat="yyyy-MM-dd"
            inputProps={{
              autocomplete: 'off',
            }}
          />
          <textarea
            className={css.formText}
            {...register('comment')}
            placeholder="Comment"
            autoComplete="off"
          />
        </div>
        <Button type="submit" title="Send">
          Send
        </Button>
      </form>
    </div>
  );
};
