import { BOOKING } from '@types';

const INITIAL_STATE = {
  // All bookings.
  bookings: {
    data: null,
    error: null,
    isPending: false,
  },
  // Not collected bookings
  notCollectedBookings: {
    data: null,
    error: null,
    isPending: false,
  },
  // The current booking.
  currentBooking: {
    data: null,
    error: null,
    isPending: false,
  },

  // During creating a booking.
  creatingBooking: {
    data: null,
    error: null,
    isPending: false,
  },

  // During updating a booking.
  updatingBooking: {
    data: null,
    error: null,
    isPending: false,
  },

  // During deleting a booking.
  deletingBooking: {
    data: null,
    error: null,
    isPending: false,
  },
};

const BookingReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    // Get not collected bookings.
    case BOOKING.GET_NOT_COLLECTED_BOOKINGS_FULFILLED: {
      const notCollectedBookings = {
        ...state.notCollectedBookings,
        data: payload.data.data,
        error: null,
        isPending: false,
      };
      return { ...state, notCollectedBookings };
    }

    case BOOKING.GET_NOT_COLLECTED_BOOKINGS_PENDING: {
      const notCollectedBookings = {
        ...state.notCollectedBookings,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, notCollectedBookings };
    }

    case BOOKING.GET_NOT_COLLECTED_BOOKINGS_REJECTED: {
      const notCollectedBookings = {
        ...state.notCollectedBookings,
        data: null,
        error: payload.data.msg,
        isPending: false,
      };
      return { ...state, notCollectedBookings };
    }

    // Get all bookings.
    case BOOKING.GET_BOOKINGS_FULFILLED: {
      const bookings = {
        ...state.bookings,
        data: payload.data.data,
        error: null,
        isPending: false,
      };
      return { ...state, bookings };
    }

    case BOOKING.GET_BOOKINGS_PENDING: {
      const bookings = {
        ...state.bookings,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, bookings };
    }

    case BOOKING.GET_BOOKINGS_REJECTED: {
      const bookings = {
        ...state.bookings,
        data: null,
        error: true,
        isPending: false,
      };
      return { ...state, bookings };
    }

    // Get a booking.
    case BOOKING.GET_BOOKING_FULFILLED: {
      const currentBooking = {
        ...state.currentBooking,
        data: payload.data.data,
        error: null,
        isPending: false,
      };
      return { ...state, currentBooking };
    }

    case BOOKING.GET_BOOKING_PENDING: {
      const currentBooking = {
        ...state.currentBooking,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, currentBooking };
    }

    case BOOKING.GET_BOOKING_REJECTED: {
      const currentBooking = {
        ...state.currentBooking,
        data: null,
        error: true,
        isPending: false,
      };
      return { ...state, currentBooking };
    }

    // Update a booking.
    case BOOKING.UPDATE_BOOKING_FULFILLED: {
      const updatingBooking = {
        ...state.updatingBooking,
        data: null,
        error: null,
        isPending: false,
      };
      return { ...state, updatingBooking };
    }

    case BOOKING.UPDATE_BOOKING_PENDING: {
      const updatingBooking = {
        ...state.updatingBooking,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, updatingBooking };
    }

    case BOOKING.UPDATE_BOOKING_REJECTED: {
      const updatingBooking = {
        ...state.updatingBooking,
        data: null,
        error: true,
        isPending: false,
      };
      return { ...state, updatingBooking };
    }

    // Create a new booking.
    case BOOKING.CREATE_BOOKING_FULFILLED: {
      const creatingBooking = {
        ...state.creatingBooking,
        data: payload.data.data,
        error: null,
        isPending: false,
      };
      return { ...state, creatingBooking };
    }

    case BOOKING.CREATE_BOOKING_PENDING: {
      const creatingBooking = {
        ...state.creatingBooking,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, creatingBooking };
    }

    case BOOKING.CREATE_BOOKING_REJECTED: {
      const creatingBooking = {
        ...state.creatingBooking,
        data: null,
        error: true,
        isPending: false,
      };
      return { ...state, creatingBooking };
    }

    // Delete a booking.
    case BOOKING.DELETE_BOOKINGS_FULFILLED: {
      const deletingBooking = {
        ...state.deletingBooking,
        data: null,
        error: null,
        isPending: false,
      };
      return { ...state, deletingBooking };
    }

    case BOOKING.DELETE_BOOKINGS_PENDING: {
      const deletingBooking = {
        ...state.deletingBooking,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, deletingBooking };
    }

    case BOOKING.DELETE_BOOKINGS_REJECTED: {
      const deletingBooking = {
        ...state.deletingBooking,
        data: null,
        error: true,
        isPending: false,
      };
      return { ...state, deletingBooking };
    }

    default: {
      return state;
    }
  }
};

export { INITIAL_STATE, BookingReducer };
