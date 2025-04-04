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
          />
          {errors.name && (
            <span className={css.errorName}>{errors.name.message}</span>
          )}
          <input
            className={css.formInput}
            type="email"
            {...register('email')}
            placeholder="Email*"
          />
          {errors.email && (
            <span className={css.errorEmail}>{errors.email.message}</span>
          )}
          <DatePicker
            className={css.calendar}
            {...register('date')}
            selected={startDate}
            onChange={handleDateChange}
            placeholderText="Booking date"
            dateFormat="yyyy-MM-dd"
          />
          <textarea
            className={css.formText}
            {...register('comment')}
            placeholder="Comment"
          />
        </div>
        <Button type="submit" title="Send">
          Send
        </Button>
      </form>
    </div>
  );
};
