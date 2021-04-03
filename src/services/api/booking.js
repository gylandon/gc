import axios from 'axios';
import endpoints from '@endPoints';

const createBooking = (data) => {
  try {
    const url = endpoints.CREATE_BOOKING;
    const requestBody = new FormData();

    requestBody.append('customerId', data.customerId);
    requestBody.append('sid', data.sid);
    requestBody.append('collectionDate', data.collectionDate);
    requestBody.append('bookingDate', data.bookingDate);
    requestBody.append('note', data.note);

    return axios.post(url, requestBody);
  } catch (err) {
    console.log(err);
  }
};

// todo - for some reason backend cannot receive the parameters for delete
// const deleteBookings = (bookingIds) => {
//   try {
//     const url = endpoints.DELETE_BOOKINGS;
//     const config = {
//       data: {
//         dataId: bookingIds,
//       },
//     };
//
//     return axios.delete(url, config);
//   } catch (err) {
//     console.log(err);
//   }
// };

const deleteBookings = (bookingIds) => {
  try {
    const url = endpoints.DELETE_BOOKINGS;
    const requestBody = new FormData();
    requestBody.append('dataId', bookingIds);

    return axios.post(url, requestBody);
  } catch (err) {
    console.log(err);
  }
};

const getNotCollectedBookings = () => {
  try {
    const url = endpoints.GET_NOT_COLLECTED_BOOKINGS;
    return axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

const getBookings = () => {
  try {
    const url = endpoints.GET_BOOKINGS;
    return axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

const getBooking = (bookingId) => {
  try {
    const url = endpoints.GET_BOOKING;
    const config = {
      data: {
        dataId: bookingId,
      },
    };

    return axios.get(url, config);
  } catch (err) {
    console.log(err);
  }
};

const updateBooking = (data) => {
  try {
    const url = endpoints.UPDATE_BOOKING;
    const requestBody = new FormData();

    requestBody.append('dataId', data.dataId);
    requestBody.append('customerId', data.customerId);
    requestBody.append('sid', data.sid);
    requestBody.append('collectionDate', data.collectionDate);
    requestBody.append('bookingDate', data.bookingDate);
    requestBody.append('note', data.note);

    return axios.put(url, requestBody);
  } catch (err) {
    console.log(err);
  }
};

export default {
  createBooking,
  getNotCollectedBookings,
  deleteBookings,
  getBookings,
  getBooking,
  updateBooking,
};
