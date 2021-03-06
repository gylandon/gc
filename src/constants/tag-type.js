const TAGS = {
  COLLECTED: 'COLLECTED',
  BOOKED: 'BOOKED',
  PENDING: 'PENDING',
  PROCESSED: 'PROCESSED',
  PROCESSING: 'PROCESSING',
  ERROR: 'ERROR',
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
  UNPROCESSED: 'UNPROCESSED',
};

// Index for each tag in booking table, used by sorting the tags in data grid
const TAG_INDEX_BOOKING = {
  [TAGS.COLLECTED]: 4,
  [TAGS.BOOKED]: 3,
  [TAGS.PENDING]: 2,
  [TAGS.ERROR]: 1,
};

const TAG_INDEX_ACCOUNT = {
  [TAGS.ENABLED]: 2,
  [TAGS.DISABLED]: 1,
};

const TAG_INDEX_COLLECTION = {
  [TAGS.PROCESSED]: 2,
  [TAGS.UNPROCESSED]: 1,
};

export { TAGS, TAG_INDEX_BOOKING, TAG_INDEX_ACCOUNT, TAG_INDEX_COLLECTION };
