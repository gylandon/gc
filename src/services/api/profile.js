import axios from 'axios';
import endpoints from '@endPoints';

const fetchPro = async () => {
  try {
    const url = endpoints.FETCHINFO;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.log(err);
    Promise.reject(err.response);
    return err.response;
  }
};

const updateBasic = async (data) => {
  try {
    const url = endpoints.UPDATEINFO;
    const requestBody = new FormData();
    requestBody.append('email', data.email);
    requestBody.append('name', data.name);
    requestBody.append('phone', data.phone);
    requestBody.append('businessType', data.businessType);
    const response = await axios.post(url, requestBody);
    return response;
  } catch (err) {
    console.log(err);
    Promise.reject(err.response.data);
    return err.response.data;
  }
};

export default { fetchPro, updateBasic };
