import configureStore from 'redux-mock-store';
import reduxPromise from 'redux-promise-middleware';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { BOOKING } from './test-data';
import endpoints from '@endPoints';
import actions from '@actions/booking';
import { BOOKING as types } from '@types';

describe('Booking actions', () => {
  const middleware = [reduxPromise];
  const mockStore = configureStore(middleware);
  const bookingData = BOOKING.BOOKING_DATA;
  const bookingsData = BOOKING.BOOKINGS_DATA;
  const newBookingData = BOOKING.NEW_BOOKING_DATA;
  const updateBookingData = BOOKING.UPDATE_BOOKING_DATA;

  global.FormData = () => {
    return { append: jest.fn() };
  };

  let mock;
  let store;

  describe('getBooking', () => {
    beforeEach(() => {
      mock = new MockAdapter(axios);
      store = mockStore();
    });

    it('can handle success scenario correctly', (done) => {
      mock.onGet(endpoints.GET_BOOKING).reply(200, bookingData);
      store.dispatch(actions.getBooking(1)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.GET_BOOKING_PENDING);
        expect(actions[1].type).toEqual(types.GET_BOOKING_FULFILLED);
        expect(actions[1].payload.data).toEqual(bookingData);
        done();
      });
    });

    it('can handle failure scenario correctly', (done) => {
      mock.onGet(endpoints.GET_BOOKING).reply(404);
      store.dispatch(actions.getBooking(1)).catch(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.GET_BOOKING_PENDING);
        expect(actions[1].type).toEqual(types.GET_BOOKING_REJECTED);
        expect(actions[1].error).toBeTruthy();
        done();
      });
    });
  });

  describe('getBookings', () => {
    beforeEach(() => {
      mock = new MockAdapter(axios);
      store = mockStore();
    });

    it('can handle success scenario correctly', (done) => {
      mock.onGet(endpoints.GET_BOOKINGS).reply(200, bookingsData);
      store.dispatch(actions.getBookings(1)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.GET_BOOKINGS_PENDING);
        expect(actions[1].type).toEqual(types.GET_BOOKINGS_FULFILLED);
        expect(actions[1].payload.data).toEqual(bookingsData);
        done();
      });
    });

    it('can handle failure scenario correctly', (done) => {
      mock.onGet(endpoints.GET_BOOKINGS).reply(404);
      store.dispatch(actions.getBookings(1)).catch(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.GET_BOOKINGS_PENDING);
        expect(actions[1].type).toEqual(types.GET_BOOKINGS_REJECTED);
        expect(actions[1].error).toBeTruthy();
        done();
      });
    });
  });

  describe('createBooking', () => {
    beforeEach(() => {
      mock = new MockAdapter(axios);
      store = mockStore();
    });

    it('can handle success scenario correctly', (done) => {
      mock.onPost(endpoints.CREATE_BOOKING).reply(200, 1);
      store.dispatch(actions.createBooking(newBookingData)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.CREATE_BOOKING_PENDING);
        expect(actions[1].type).toEqual(types.CREATE_BOOKING_FULFILLED);
        expect(actions[1].payload.data).toEqual(1);
        done();
      });
    });

    it('can handle failure scenario correctly', (done) => {
      mock.onPost(endpoints.CREATE_BOOKING).reply(404);
      store.dispatch(actions.createBooking(newBookingData)).catch(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.CREATE_BOOKING_PENDING);
        expect(actions[1].type).toEqual(types.CREATE_BOOKING_REJECTED);
        expect(actions[1].error).toBeTruthy();
        done();
      });
    });
  });

  describe('updateBooking', () => {
    beforeEach(() => {
      mock = new MockAdapter(axios);
      store = mockStore();
    });

    it('can handle success scenario correctly', (done) => {
      mock.onPut(endpoints.UPDATE_BOOKING).reply(200);
      store.dispatch(actions.updateBooking(updateBookingData)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.UPDATE_BOOKING_PENDING);
        expect(actions[1].type).toEqual(types.UPDATE_BOOKING_FULFILLED);
        done();
      });
    });

    it('can handle failure scenario correctly', (done) => {
      mock.onPost(endpoints.UPDATE_BOOKING).reply(404);
      store.dispatch(actions.updateBooking(updateBookingData)).catch(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.UPDATE_BOOKING_PENDING);
        expect(actions[1].type).toEqual(types.UPDATE_BOOKING_REJECTED);
        expect(actions[1].error).toBeTruthy();
        done();
      });
    });
  });

  describe('deleteBookings', () => {
    beforeEach(() => {
      mock = new MockAdapter(axios);
      store = mockStore();
    });

    it('can handle success scenario correctly', (done) => {
      mock.onPost(endpoints.DELETE_BOOKINGS).reply(200);
      store.dispatch(actions.deleteBookings([1])).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.DELETE_BOOKINGS_PENDING);
        expect(actions[1].type).toEqual(types.DELETE_BOOKINGS_FULFILLED);
        done();
      });
    });

    it('can handle failure scenario correctly', (done) => {
      mock.onPost(endpoints.DELETE_BOOKINGS).reply(404);
      store.dispatch(actions.deleteBookings([1])).catch(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.DELETE_BOOKINGS_PENDING);
        expect(actions[1].type).toEqual(types.DELETE_BOOKINGS_REJECTED);
        expect(actions[1].error).toBeTruthy();
        done();
      });
    });
  });
});
