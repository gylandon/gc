import apis from '../booking';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { BOOKING } from './test-data';
import endpoints from '@endPoints';

describe('Booking Apis', () => {
  let mock;
  const bookingData = BOOKING.BOOKING_DATA;
  const bookingsData = BOOKING.BOOKINGS_DATA;
  const newBookingData = BOOKING.NEW_BOOKING_DATA;
  const updateBookingData = BOOKING.UPDATE_BOOKING_DATA;

  global.FormData = () => {
    return { append: jest.fn() };
  };

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  it('can get a booking', (done) => {
    mock.onGet(endpoints.GET_BOOKING).reply(200, bookingData);
    apis
      .getBooking(1)
      .then((response) => {
        expect(mock.history.get.length).toEqual(1);
        const request = mock.history.get[0];
        expect(request.url).toEqual(endpoints.GET_BOOKING);
        expect(response.status === 200);
        expect(response.data).toEqual(bookingData);
        done();
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  it('can get bookings', (done) => {
    mock.onGet(endpoints.GET_BOOKINGS).reply(200, bookingsData);
    apis
      .getBookings()
      .then((response) => {
        expect(mock.history.get.length).toEqual(1);
        const request = mock.history.get[0];
        expect(request.url).toEqual(endpoints.GET_BOOKINGS);
        expect(response.status === 200);
        expect(response.data).toEqual(bookingsData);
        done();
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  it('can create a booking', (done) => {
    const expectedResponse = { dataId: 1 };
    mock.onPost(endpoints.CREATE_BOOKING).reply(200, expectedResponse);
    apis
      .createBooking(newBookingData)
      .then((response) => {
        expect(mock.history.post.length).toEqual(1);
        const request = mock.history.post[0];
        expect(request.url).toEqual(endpoints.CREATE_BOOKING);
        expect(response.status === 200);
        expect(response.data).toEqual(expectedResponse);
        done();
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  it('can update a booking', (done) => {
    const expectedResponse = { dataId: 1 };
    mock.onPut(endpoints.UPDATE_BOOKING).reply(200, expectedResponse);
    apis
      .updateBooking(updateBookingData)
      .then((response) => {
        expect(mock.history.put.length).toEqual(1);
        const request = mock.history.put[0];
        expect(request.url).toEqual(endpoints.UPDATE_BOOKING);
        expect(response.status === 200);
        expect(response.data).toEqual(expectedResponse);
        done();
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  // todo - for some reason backend cannot receive the parameters for delete,
  //  So now used post instead
  it('can delete a booking', (done) => {
    const bookingIdsToDelete = [1, 2];
    mock.onPost(endpoints.DELETE_BOOKINGS).reply(200);
    apis
      .deleteBookings(bookingIdsToDelete)
      .then((response) => {
        expect(mock.history.post.length).toEqual(1);
        const request = mock.history.post[0];
        expect(request.url).toEqual(endpoints.DELETE_BOOKINGS);
        expect(response.status === 200);
        done();
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
});
