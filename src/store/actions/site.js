import { SITE } from '@types';
import { site as API } from '@api';

const getSites = (customerId) => {
  return {
    type: SITE.GET_SITES,
    payload: API.getSites(customerId),
  };
};

export default {
  getSites,
};
