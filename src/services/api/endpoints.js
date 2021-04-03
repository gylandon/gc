const url = 'https://gc.xieyangzhe.com';

export default {
  LOGIN: `${url}/api/auth/signin`,
  REPORT: `${url}/api/report`,
  REPORT_EARLIEST: `${url}/api/report/earliest`,
  BUSIREPORT: `${url}/api/monthlyBusinessReport`,
  BUSIREPORT_EARLIEST: `${url}/api/businessReport/earliest`,
  BUSIREPORT_FYTD: `${url}/api/FYTDbusinessReport`,
  FORGOTPWD: `${url}/api/auth/forgot`,
  RESETPWD: `${url}/api/auth/reset`,
  SIGNUP: `${url}/api/auth/signup`,

  FETCHINFO: `${url}/api/user/info`,
  DELETESITE: `${url}/api/user/site/delete`,
  ADDSITE: `${url}/api/user/site/add`,
  UPDATEINFO: `${url}/api/user/info/update`,
  UPDATESITE: `${url}/api/user/site/update`,

  GET_ACCOUNTS: `${url}/api/admin/users`,
  GET_ACCOUNT: `${url}/api/admin/user`,
  DELETE_ACCOUNT: `${url}/api/user/delete`,

  GET_NOT_COLLECTED_BOOKINGS: `${url}/api/booking/bookedList`,
  GET_BOOKINGS: `${url}/api/booking/list`,
  GET_BOOKING: `${url}/api/booking/getBooking`,
  UPDATE_BOOKING: `${url}/api/booking/update`,
  CREATE_BOOKING: `${url}/api/booking/add`,
  DELETE_BOOKINGS: `${url}/api/booking/deleteMultiple`,

  GET_COLLECTIONS: `${url}/api/collection/list`,
  GET_COLLECTION: `${url}/api/collection/detail`,
  CREATE_COLLECTION: `${url}/api/collection/add`,
  UPDATE_COLLECTION: `${url}/api/collection/update`,
  DELETE_COLLECTION: `${url}/api/collection/delete`,
  DELETE_COLLECTIONS: `${url}/api/collection/deleteMultiple`,

  GET_CUSTOMER_COLLECTIONS: `${url}/api/collection/customerList`,

  GET_CUSTOMERS: `${url}/api/user/list/simple`,
  GET_SITES: `${url}/api/user/site/list`,
  GET_TYPE: `${url}/api/user/businessType`,

  PROCESS_COLLECTION: `${url}/api/commodity/add`,
  GET_CATEGORY: `${url}/api/commodity/category`,
  GET_SERVICE: `${url}/api/commodity/serviceType`,
  GET_CONTAINER_TYPES: `${url}/api/collection/container`
};
