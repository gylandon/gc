import { combineReducers } from 'redux';
import { AuthReducer } from './auth';
import { BookingReducer } from './booking';
import { CollectionReducer } from './collection';
import { SiteReducer } from './site';
import { UsersReducer } from './users';
import { ProfileReducer } from './profile';
import { AccountReducer } from './account';
import { ProcessingReducer } from './processing';

const rootReducer = combineReducers({
  auth: AuthReducer,
  booking: BookingReducer,
  users: UsersReducer,
  site: SiteReducer,
  collection: CollectionReducer,
  profile: ProfileReducer,
  account: AccountReducer,
  processing: ProcessingReducer,
});

export { rootReducer };
