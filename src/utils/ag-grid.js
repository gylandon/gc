/**
 * Comparator used to compare dates, used by ag-grid date-filters.
 *
 * @author - ag-grid
 * @see {https://www.ag-grid.com/javascript-grid-filtering/}
 * @param {Object} filterLocalDateAtMidnight - argument supplied by ag-grid.
 * @param {Object} cellValue - argument supplied by ag-grid.
 * @return {number} - result used by ag-grid.
 */
const dateComparator = (filterLocalDateAtMidnight, cellValue) => {
  const dateAsString = cellValue;
  if (dateAsString == null) return -1;
  const dateParts = dateAsString.split('/');
  const cellDate = new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0])
  );
  if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    return 0;
  }
  if (cellDate < filterLocalDateAtMidnight) {
    return -1;
  }
  if (cellDate > filterLocalDateAtMidnight) {
    return 1;
  }
};

/**
 * Comparator used for sorting dates, used by ag-grid columnDefs
 *
 * @author - ag-grid
 * @see {https://www.ag-grid.com/javascript-grid-sorting/}
 * @param {string} date1 - date 1
 * @param {string} date2 - date 2
 * @return {number} - result used by ag-grid.
 */
const dateSortComparator = (date1, date2) => {
  const date1Number = dateToComparableNumber(date1);
  const date2Number = dateToComparableNumber(date2);

  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }

  return date1Number - date2Number;
};

/**
 * Transform date string to number for comparison
 *
 * @author - ag-grid
 * @see {https://www.ag-grid.com/javascript-grid-sorting/}
 * @param {string|null} date - date
 * @return {number|null} - number, eg 29/08/2004 gets converted to 20040829
 */
const dateToComparableNumber = (date) => {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }

  const yearNumber = date.substring(6, 10);
  const monthNumber = date.substring(3, 5);
  const dayNumber = date.substring(0, 2);

  return yearNumber * 10000 + monthNumber * 100 + dayNumber;
};

/**
 * Build comparator used for sorting status, used by ag-grid columnDefs
 *
 * @param {object} tagIndex - a tag index object showing the order of tags
 * @return {function} - the comparator.
 */
const statusSortComparatorBuilder = (tagIndex) => {
  return (tag1, tag2) => {
    const status1 = tag1[0];
    const status2 = tag2[0];

    if (status1 === null && status2 === null) {
      return 0;
    }
    if (status1 === null) {
      return -1;
    }
    if (status2 === null) {
      return 1;
    }

    return tagIndex[tag1] - tagIndex[tag2];
  };
};

/**
 * Build a status filter for ag-grid's filterParams, with given list of status
 *
 * @param {Array} statusList - a list of status, must be from the TAGS constant
 * @return {Function}
 */
const statusFilterParamsBuilder = (statusList) => {
  const showAll = {
    displayKey: 'showAll',
    displayName: `All items`,
    test: function () {
      return true;
    },
    hideFilterInput: true,
  };
  const filterOptions = [showAll].concat(
    statusList.map((status) => {
      return {
        displayKey: status,
        displayName: `${status.charAt(0) + status.slice(1).toLowerCase()}`,
        test: function (filterValue, cellValue) {
          return cellValue.toLowerCase() === status.toLowerCase();
        },
        hideFilterInput: true,
      };
    })
  );
  return {
    buttons: ['reset'],
    debounceMs: 0,
    suppressAndOrCondition: true,
    filterOptions: filterOptions,
  };
};

export default {
  dateComparator,
  dateSortComparator,
  statusSortComparatorBuilder,
  statusFilterParamsBuilder,
};
