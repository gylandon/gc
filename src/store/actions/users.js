import { USERS } from '@types';
import { users as API } from '@api';

const getCustomers = () => {
  return {
    type: USERS.GET_CUSTOMERS,
    payload: API.getCustomers(),
  };
};

export default {
  getCustomers,
};
