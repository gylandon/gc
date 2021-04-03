import '@config/jest/matchMedia-mock.js'; // must include this before all imports to mock matchMedia
import { mount, configure } from 'enzyme';
import { MemoryRouter } from 'react-router';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { LoginView } from '../login';
import Adapter from 'enzyme-adapter-react-16';
import { findAndJoinText, updateWrapperUntil } from '@utils/testUtils';
import { useCookies } from 'react-cookie';
import { login } from '@api';
import {
  loginPending,
  loginProcessing,
  loginSuccess,
  loginReject,
} from '@actions';

jest.mock('react-cookie');
jest.mock('@api');
jest.mock('@actions');

describe('Data export function in ResultsView', () => {
  console.error = jest.fn();
  configure({ adapter: new Adapter() });
  const initialState = {};
  const initialProps = {};
  const mockStore = configureStore([]);
  const initialStore = mockStore(initialState);

  const cookies = {
    remember: 'mock',
  };
  const mockSetCookie = jest.fn();
  const mockRemoveCookie = jest.fn();
  useCookies.mockImplementation(() => {
    return [cookies, mockSetCookie, mockRemoveCookie];
  });

  const mockLoginSuccess = jest.fn();
  loginSuccess.mockImplementation(() => {
    mockLoginSuccess.call({});
  });
  const mockLoginPending = jest.fn();
  loginPending.mockImplementation(() => {
    mockLoginPending.call({});
  });
  const mockLoginProcessing = jest.fn();
  loginProcessing.mockImplementation(() => {
    mockLoginProcessing.call({});
  });
  const mockLoginReject = jest.fn();
  loginReject.mockImplementation(() => {
    mockLoginReject.call({});
  });

  const withStoreAndProps = (store, props) => (
    <Provider store={store}>
      <MemoryRouter>
        <LoginView {...props} />
      </MemoryRouter>
    </Provider>
  );

  let wrapper;
  const getRootView = () => wrapper.find('LoginView');
  const getLoginForm = () => wrapper.find("ForwardRef(Form)[id='login']");
  const formData = {
    email: 'email',
    password: 'pass',
    remember: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    login.mockImplementation(() => {
      return {
        data: {
          code: '200',
          data: 'success',
        },
      };
    });
    initialStore.dispatch = jest.fn(
      (callBack) => new Promise((resolve) => resolve(callBack.type))
    );
    wrapper = mount(withStoreAndProps(initialStore, initialProps));
  });

  it('can render the view', () => {
    expect(getRootView().length).toBeGreaterThan(0);
  });

  it('can render the email field', () => {
    const emailField = wrapper.find("FormItem[name='email']");
    expect(emailField.length).toBeGreaterThan(0);
  });

  it('can render the password field', () => {
    const passwordField = wrapper.find("FormItem[name='password']");
    expect(passwordField.length).toBeGreaterThan(0);
  });

  it('can render the remember me checkbox', () => {
    const remember = wrapper.find("FormItem[name='remember']");
    expect(remember.length).toBeGreaterThan(0);
  });

  it('can render the sign in button', () => {
    const signIn = wrapper.find("button[type='submit']");
    expect(signIn.length).toBeGreaterThan(0);
  });

  it('can render the forget password link', () => {
    const forget = wrapper.find("FormItem[name='forgetPassword']");
    expect(forget.length).toBeGreaterThan(0);
  });

  it('can render the breadcrumbs', () => {
    const breadTexts = findAndJoinText(wrapper, 'Breadcrumb');
    expect(breadTexts).toEqual(
      'HOME COLLECTION RETAIL EDUCATION LATEST NEWS ABOUT US CONTACT SIGN IN  '
    );
  });

  it('can set the remember me cookie', () => {
    const emailInput = getLoginForm().find("input[id='login_email']").props();
    expect(emailInput.value).toEqual('mock');
  });

  it('can login successfully', (done) => {
    const loginForm = getLoginForm();
    loginForm.props().onFinish(formData);
    updateWrapperUntil(wrapper, () => {
      return mockLoginSuccess.mock.calls.length > 0;
    }).then(() => {
      expect(mockLoginPending.mock.calls.length).toBeGreaterThan(0);
      expect(mockLoginProcessing.mock.calls.length).toBeGreaterThan(0);
      done();
    });
  });

  it('can login fail', (done) => {
    login.mockImplementation(() => {
      return {
        data: {
          code: '500',
          data: 'fail',
        },
      };
    });
    const loginForm = getLoginForm();
    loginForm.props().onFinish(formData);
    updateWrapperUntil(wrapper, () => {
      return mockLoginReject.mock.calls.length > 0;
    }).then(() => {
      done();
    });
  });
});
