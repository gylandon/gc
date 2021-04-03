import axios from 'axios';
import endpoints from '@endPoints';

export const getReport = async ({ displayFrom, displayTo }) => {
  const url = `${endpoints.REPORT}?displayFrom=${displayFrom}&displayTo=${displayTo}`;
  const response = await axios.get(url);
  return response;
};

export const getEarliest = async () => {
  const url = `${endpoints.REPORT_EARLIEST}`;
  const response = await axios.get(url);
  return response;
};

export const getBusinessReport = async ({ displayFrom }) => {
  const url = `${endpoints.BUSIREPORT}?displayFrom=${displayFrom}`;
  const response = await axios.get(url);
  return response;
};

export const getBusinessReportFYTD = async ({ displayFrom }) => {
  const url = `${endpoints.BUSIREPORT_FYTD}?displayFrom=${displayFrom}`;
  const response = await axios.get(url);
  return response;
};

export const getBusinessEarliest = async () => {
  const url = `${endpoints.BUSIREPORT_EARLIEST}`;
  const response = await axios.get(url);
  return response;
};
