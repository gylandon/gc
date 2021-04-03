import { mount, configure } from 'enzyme';
import { MemoryRouter } from 'react-router';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16/build';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as R from 'ramda';

import { BookingView } from '../index';
import { ensureGridApiHasBeenSet } from '@utils/testUtils';
import { BOOKING, CUSTOMER } from './test-data';
import { INITIAL_STATE as BOOKING_INITIAL_STATE } from '@reducers/booking';
import { INITIAL_STATE as USER_INITIAL_STATE } from '@reducers/users';
import { TEST_ID } from '@constants';

/**
 * BookingView functional tests.
 */

describe('BookingView', () => {
  console.error = jest.fn();
  console.warn = jest.fn();

  let wrapper = null;

  const mock = new MockAdapter(axios);
  const getBookingsApi = /api\/booking\/list/;
  const updateBookingApi = /api\/booking\/update/;
  const createBookingApi = /api\/booking\/add/;
  const deleteBookingsApi = /api\/booking\/deleteMultiple/;
  const getCustomersApi = /api\/user\/list\/simple/;

  configure({ adapter: new Adapter() });
  const initialState = {
    booking: R.clone(BOOKING_INITIAL_STATE),
    users: R.clone(USER_INITIAL_STATE),
  };
  const initialProps = {};
  const mockStore = configureStore([]);
  const initialStore = mockStore(initialState);

  const withStoreAndProps = (store, props) => (
    <Provider store={store}>
      <MemoryRouter>
        <BookingView {...props} />
      </MemoryRouter>
    </Provider>
  );

  const getRootView = () => wrapper.find('BookingView');
  const getDataGrid = () => wrapper.find('AgGridReact');
  const getHeader = () => wrapper.find('HeaderLogged');
  const getSpinner = () => wrapper.find('Spin');
  const getErrorPlaceholder = () => wrapper.find('TagErrorPlaceholder');
  const getCreateBtn = () =>
    wrapper.find(`[data-testid="${TEST_ID.BOOKING_CREATE_BTN}"]`).first();
  const getDeleteBtn = () =>
    wrapper.find(`[data-testid="${TEST_ID.BOOKING_DELETE_BTN}"]`).first();

  beforeEach((done) => {
    jest.clearAllMocks();
    mock.resetHistory();
    mock.onGet(getBookingsApi).reply(200, BOOKING.BOOKINGS_DATA);
    mock
      .onPost(createBookingApi)
      .reply(200, { data: { dataId: 1 }, msg: 'success' });
    mock.onPut(updateBookingApi).reply(200, { msg: 'success' });
    mock.onPost(deleteBookingsApi).reply(200, { msg: 'success' });
    mock.onGet(getCustomersApi).reply(200, CUSTOMER.CUSTOMERS_DATA);
    initialStore.dispatch = jest.fn(
      (callBack) => new Promise((resolve) => resolve(callBack.type))
    );
    if (wrapper !== null) {
      wrapper.unmount();
    }
    wrapper = mount(withStoreAndProps(initialStore, initialProps));
    ensureGridApiHasBeenSet(getDataGrid()).then(() => done());
  });

  it('should render the component', () => {
    expect(getRootView().length).toBeGreaterThan(0);
    expect(wrapper.find('BookingView').length).toBeGreaterThan(0);
  });

  it('should render the header', () => {
    expect(getHeader().length).toBeGreaterThan(0);
  });

  it('should render the buttons', () => {
    const expectedNumberOfButtons = 4;
    const numOfButtons = wrapper.find('button').length;
    expect(numOfButtons).toEqual(expectedNumberOfButtons);
    expect(getCreateBtn().length).toBeGreaterThan(0);
    expect(getDeleteBtn().length).toBeGreaterThan(0);
  });

  it('should not show spinner after data is loaded', () => {
    expect(getSpinner().props().spinning).toBeFalsy();
  });

  it('shows spinner when booking data are being loaded', () => {
    const states = {
      ...initialState,
      booking: {
        ...initialState.booking,
        bookings: {
          ...initialState.booking.bookings,
          isPending: true,
        },
      },
    };
    const loadingStore = mockStore(states);
    loadingStore.dispatch = jest.fn(
      (callBack) => new Promise((resolve) => resolve(callBack.type))
    );
    if (wrapper !== null) {
      wrapper.unmount();
    }
    wrapper = mount(withStoreAndProps(loadingStore, initialProps));
    expect(getSpinner().props().spinning).toBeTruthy();
  });

  it('shows spinner when customer data are being loaded', () => {
    const states = {
      ...initialState,
      users: {
        ...initialState.users,
        customers: {
          ...initialState.users.customers,
          isPending: true,
        },
      },
    };
    const loadingStore = mockStore(states);
    loadingStore.dispatch = jest.fn(
      (callBack) => new Promise((resolve) => resolve(callBack.type))
    );
    if (wrapper !== null) {
      wrapper.unmount();
    }
    wrapper = mount(withStoreAndProps(loadingStore, initialProps));
    expect(getSpinner().props().spinning).toBeTruthy();
  });

  it('shows error placeholder when booking data loading fails', () => {
    const states = {
      ...initialState,
      booking: {
        ...initialState.booking,
        bookings: {
          ...initialState.booking.bookings,
          error: 'error',
        },
      },
    };
    const errorStore = mockStore(states);
    errorStore.dispatch = jest.fn(
      (callBack) => new Promise((resolve) => resolve(callBack.type))
    );
    if (wrapper !== null) {
      wrapper.unmount();
    }
    wrapper = mount(withStoreAndProps(errorStore, initialProps));
    expect(getErrorPlaceholder().length).toBeGreaterThan(0);
  });

  it('shows error placeholder when customer data loading fails', () => {
    const states = {
      ...initialState,
      users: {
        ...initialState.users,
        customers: {
          ...initialState.users.customers,
          error: 'error',
        },
      },
    };
    const errorStore = mockStore(states);
    errorStore.dispatch = jest.fn(
      (callBack) => new Promise((resolve) => resolve(callBack.type))
    );
    if (wrapper !== null) {
      wrapper.unmount();
    }
    wrapper = mount(withStoreAndProps(errorStore, initialProps));
    expect(getErrorPlaceholder().length).toBeGreaterThan(0);
  });

  it('should attempt to fetch data during mount', () => {
    expect(initialStore.dispatch).toHaveBeenCalledTimes(2);
    const callTypes = initialStore.dispatch.mock.calls
      .map((call) => call[0].type)
      .join('-');
    expect(callTypes).toEqual('GET_BOOKINGS-GET_CUSTOMERS');
  });
});
