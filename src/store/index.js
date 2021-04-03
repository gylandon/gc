import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '@reducers';
import { setAuthorizationToken } from '@utils';
import reduxPromise from 'redux-promise-middleware';

const copyStateToLocal = (state) => {
  try {
    const stateInLocal = JSON.stringify(state);
    localStorage.setItem('state', stateInLocal);
    const token = state.auth[0].data.token;
    setAuthorizationToken(token);
  } catch (error) {
    console.log(error);
  }
};

const copyStateToRedux = () => {
  try {
    const state = localStorage.getItem('state');
    if (state === null) {
      setAuthorizationToken();
      return undefined;
    }

    const token = JSON.parse(state).auth[0].data.token;
    setAuthorizationToken(token);
    return JSON.parse(state);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const persistedState = copyStateToRedux();
const middleware = [reduxPromise];

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => copyStateToLocal(store.getState()));

export { store };
