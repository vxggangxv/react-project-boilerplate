import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useDidUpdateEffect, useShallowSelector } from 'lib/utils';
import { ErrorForm } from 'components/base/error';
import { DispatchActions } from 'store/actionCreators';
import { ToastContainer, toast } from 'react-toastify';
import ErrorIcon from '@material-ui/icons/Error';
import { CustomToastContent } from 'components/base/notifications';
// import { icon_modal_alert } from 'components/base/images';
// import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
// import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
// import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

function ErrorContainer(props) {
  const { responseStatus } = useShallowSelector(state => ({
    responseStatus: state.base.responseStatus,
  }));
  const history = useHistory();

  // NOTE: Error Status 에 따른 toast 알림
  const responseStatusConfig = {
    status400() {
      toast.error(() => <CustomToastContent content="Bad Request" />);
    },
    status401() {
      toast.error(() => <CustomToastContent content="Unauthorized" />);
    },
    status403() {
      toast.error(() => <CustomToastContent content="Forbidden" />);
    },
    status404() {
      toast.error(() => <CustomToastContent content="Not Found" />);
    },
    status405() {
      toast.error(() => <CustomToastContent content="Method Not Allowd" />);
    },
    status409() {
      toast.error(() => <CustomToastContent content="Conflict" />);
    },
    status429() {
      toast.error(() => <CustomToastContent content="Too many Requests" />);
    },
    status500() {
      history.replace('/error/500');
      DispatchActions.response_status(false);
    },
  };
  // const responseStatus401 = () => toast('Will close after 7s', { autoClose: 7000 });

  // NOTE: 500에러발생시 replace
  // test용 useEffect
  useEffect(() => {
    // useDidUpdateEffect(() => {
    if (!responseStatus) return;
    if (responseStatus) return responseStatusConfig[`status${responseStatus}`]();
  }, [responseStatus]);

  return null;
}

export default ErrorContainer;
