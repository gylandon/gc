import { BOOKING } from '@types';
import { booking as API } from '@api';

const createBooking = (data) => {
  return {
    type: BOOKING.CREATE_BOOKING,
    payload: API.createBooking(data),
  };
};

const deleteBookings = (bookingIds) => {
  return {
    type: BOOKING.DELETE_BOOKINGS,
    payload: API.deleteBookings(bookingIds),
  };
};

const getNotCollectedBookings = () => {
  return {
    type: BOOKING.GET_NOT_COLLECTED_BOOKINGS,
    payload: API.getNotCollectedBookings(),
  };
};

const getBookings = () => {
  return {
    type: BOOKING.GET_BOOKINGS,
    payload: API.getBookings(),
  };
};

const getBooking = (bookingId) => {
  return {
    type: BOOKING.GET_BOOKING,
    payload: API.getBooking(bookingId),
  };
};

const updateBooking = (data) => {
  return {
    type: BOOKING.UPDATE_BOOKING,
    payload: API.updateBooking(data),
  };
};

export default {
  createBooking,
  getNotCollectedBookings,
  deleteBookings,
  getBooking,
  getBookings,
  updateBooking,
};
