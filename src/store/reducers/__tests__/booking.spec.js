import { BOOKING as types } from '@types';
import { INITIAL_STATE, BookingReducer as reducer } from '@reducers/booking';

describe('Booking reducer', () => {
  const data = 'data';
  const payload = { data: { data: data } };

  describe('getBooking', () => {
    it('can change status when pending', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.GET_BOOKING_PENDING,
      };
      const newState = reducer(initialState, action);
      expect(newState.currentBooking.isPending).toBeTruthy();
      expect(newState.currentBooking.error).toBeNull();
    });

    it('can successfully finish', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.GET_BOOKING_FULFILLED,
        payload: payload,
      };
      const newState = reducer(initialState, action);
      expect(newState.currentBooking.isPending).toBeFalsy();
      expect(newState.currentBooking.error).toBeNull();
      expect(newState.currentBooking.data).toEqual(data);
    });

    it('can record error', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.GET_BOOKING_REJECTED,
      };
      const newState = reducer(initialState, action);
      expect(newState.currentBooking.isPending).toBeFalsy();
      expect(newState.currentBooking.error).not.toBeNull();
    });
  });

  describe('getBookings', () => {
    it('can change status when pending', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.GET_BOOKINGS_PENDING,
      };
      const newState = reducer(initialState, action);
      expect(newState.bookings.isPending).toBeTruthy();
      expect(newState.bookings.error).toBeNull();
    });

    it('can successfully finish', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.GET_BOOKINGS_FULFILLED,
        payload: payload,
      };
      const newState = reducer(initialState, action);
      expect(newState.bookings.isPending).toBeFalsy();
      expect(newState.bookings.error).toBeNull();
      expect(newState.bookings.data).toEqual(data);
    });

    it('can record error', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.GET_BOOKINGS_REJECTED,
      };
      const newState = reducer(initialState, action);
      expect(newState.bookings.isPending).toBeFalsy();
      expect(newState.bookings.error).not.toBeNull();
    });
  });

  describe('createBooking', () => {
    it('can change status when pending', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.CREATE_BOOKING_PENDING,
      };
      const newState = reducer(initialState, action);
      expect(newState.creatingBooking.isPending).toBeTruthy();
      expect(newState.currentBooking.error).toBeNull();
    });

    it('can successfully finish', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.CREATE_BOOKING_FULFILLED,
        payload: payload,
      };
      const newState = reducer(initialState, action);
      expect(newState.creatingBooking.isPending).toBeFalsy();
      expect(newState.creatingBooking.error).toBeNull();
      expect(newState.creatingBooking.data).toEqual(data);
    });

    it('can record error', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.CREATE_BOOKING_REJECTED,
      };
      const newState = reducer(initialState, action);
      expect(newState.creatingBooking.isPending).toBeFalsy();
      expect(newState.creatingBooking.error).not.toBeNull();
    });
  });

  describe('updateBooking', () => {
    it('can change status when pending', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.UPDATE_BOOKING_PENDING,
      };
      const newState = reducer(initialState, action);
      expect(newState.updatingBooking.isPending).toBeTruthy();
      expect(newState.updatingBooking.error).toBeNull();
    });

    it('can successfully finish', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.UPDATE_BOOKING_FULFILLED,
      };
      const newState = reducer(initialState, action);
      expect(newState.updatingBooking.isPending).toBeFalsy();
      expect(newState.updatingBooking.error).toBeNull();
    });

    it('can record error', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.UPDATE_BOOKING_REJECTED,
      };
      const newState = reducer(initialState, action);
      expect(newState.updatingBooking.isPending).toBeFalsy();
      expect(newState.updatingBooking.error).not.toBeNull();
    });
  });

  describe('deleteBooking', () => {
    it('can change status when pending', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.DELETE_BOOKINGS_PENDING,
      };
      const newState = reducer(initialState, action);
      expect(newState.deletingBooking.isPending).toBeTruthy();
      expect(newState.deletingBooking.error).toBeNull();
    });

    it('can successfully finish', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.DELETE_BOOKINGS_FULFILLED,
      };
      const newState = reducer(initialState, action);
      expect(newState.deletingBooking.isPending).toBeFalsy();
      expect(newState.deletingBooking.error).toBeNull();
    });

    it('can record error', () => {
      const initialState = { ...INITIAL_STATE };
      const action = {
        type: types.DELETE_BOOKINGS_REJECTED,
      };
      const newState = reducer(initialState, action);
      expect(newState.deletingBooking.isPending).toBeFalsy();
      expect(newState.deletingBooking.error).not.toBeNull();
    });
  });
});
