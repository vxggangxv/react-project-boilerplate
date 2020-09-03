import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useDidUpdateEffect, useShallowSelector } from 'lib/utils';
import { ErrorForm } from 'components/base/error';
import { DispatchActions } from 'store/actionCreators';

function ErrorContainer(props) {
  const { responseStatus } = useShallowSelector(state => ({
    responseStatus: state.base.responseStatus,
  }));
  const history = useHistory();

  // NOTE: 500에러발생시 replace
  useDidUpdateEffect(() => {
    if (responseStatus === 500) history.replace('/error/500');
    DispatchActions.base_result_status(false);
  }, [responseStatus]);

  return null;
}

export default ErrorContainer;
