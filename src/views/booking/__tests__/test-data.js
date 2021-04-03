const BOOKING = {
  BOOKING_DATA: {
    dataId: 4,
    customerId: 2,
    customerName: 'Melbourne Law School',
    sid: 1,
    siteId: 'A002',
    siteName: 'demo',
    location: 'demo',
    bookingDate: '2020-08-23',
    collectionDate: '2021-01-22',
    status: ['BOOKED'],
  },
  BOOKINGS_DATA: [
    {
      dataId: 1,
      customerId: 1,
      customerName: 'Melbourne School of Engineering',
      sid: 3,
      siteId: 'A001',
      siteName: 'demo',
      bookingDate: '2020-08-23',
      collectionDate: '2021-08-20',
      status: ['BOOKED'],
    },
    {
      dataId: 2,
      customerId: 2,
      customerName: 'Melbourne Law School',
      sid: 1,
      siteId: 'A002',
      siteName: 'demo',
      bookingDate: '2020-08-23',
      collectionDate: '2021-01-22',
      status: ['BOOKED', 'PENDING'],
    },
  ],
  NEW_BOOKING_DATA: {
    customerId: 1,
    sid: 3,
    bookingDate: '2020-08-23',
    collectionDate: '2021-01-22',
    note: 'note',
  },
  UPDATE_BOOKING_DATA: {
    dataId: 1,
    customerId: 1,
    sid: 3,
    bookingDate: '2020-08-23',
    collectionDate: '2021-01-22',
    note: 'note',
  },
};

const CUSTOMER = {
  CUSTOMERS_DATA: [
    {
      uid: 1,
      name: 'customer1',
      sites: [
        {
          sid: 3,
          name: 'site3',
          location: 'location3',
          siteId: 'S003',
        },
      ],
    },
    {
      uid: 2,
      name: 'customer2',
      sites: [
        {
          sid: 1,
          name: 'site1',
          location: 'location1',
          siteId: 'S001',
        },
      ],
    },
  ],
};

export { BOOKING, CUSTOMER };
