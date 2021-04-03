import axios from 'axios';
import endpoints from '@endPoints';

const getCustomers = () => {
  try {
    const url = endpoints.GET_CUSTOMERS;
    return axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

export default {
  getCustomers,
};
