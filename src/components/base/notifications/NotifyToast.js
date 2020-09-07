import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NotifyToast(props) {
  return (
    <ToastContainer
      position="bottom-right"
      // autoClose={false}
      autoClose={2500}
      hideProgressBar
      // hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

export default NotifyToast;
