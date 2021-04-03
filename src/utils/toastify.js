import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastify = {
  // for options see https://fkhadra.github.io/react-toastify/api/toast
  toastError: (message) => {
    const options = {
      position: toast.POSITION.TOP_CENTER,
    };
    return toast.error(message, options);
  },

  toastInfo: (message) => {
    const options = {
      position: toast.POSITION.TOP_CENTER,
      closeButton: false,
      autoClose: 3000,
    };
    return toast.info(message, options);
  },

  toastSuccess: (message) => {
    const options = {
      position: toast.POSITION.TOP_CENTER,
      closeButton: false,
      autoClose: 1000,
    };
    return toast.success(message, options);
  },

  toastWarn: (message) => {
    const options = {
      position: toast.POSITION.TOP_CENTER,
    };
    return toast.warn(message, options);
  },
};

export { toastify, ToastContainer };
