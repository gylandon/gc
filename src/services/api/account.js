import axios from 'axios';
import endpoints from '@endPoints';

const login = async (email, password) => {
  try {
    const url = endpoints.LOGIN;
    const requestBody = new FormData();
    requestBody.append('email', email);
    requestBody.append('password', password);

    const response = await axios.post(url, requestBody);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const forgotPwd = async (email) => {
  try {
    const url = endpoints.FORGOTPWD;
    const requestBody = new FormData();
    requestBody.append('email', email);

    const response = await axios.post(url, requestBody);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const resetPwd = async (password, email, token) => {
  try {
    const url = endpoints.RESETPWD;
    const requestBody = new FormData();
    requestBody.append('password', password);
    requestBody.append('email', email);
    requestBody.append('token', token);

    const response = await axios.post(url, requestBody);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const signup = async (data) => {
  try {
    const url = endpoints.SIGNUP;
    // staffId === undefined ? (staffId = '') : (staffId = staffId);
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axios.post(url, data, {
      headers: headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};



export default { login, signup, resetPwd, forgotPwd };
