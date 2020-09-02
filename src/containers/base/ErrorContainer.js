import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useDidUpdateEffect, useShallowSelector } from 'lib/utils';
import { ErrorForm } from 'components/base/error';
import { Actions } from 'store/actionCreators';

function ErrorContainer(props) {
  const { resultStatus } = useShallowSelector(state => ({
    resultStatus: state.base.resultStatus,
  }));
  const history = useHistory();

  // NOTE: 500에러발생시 replace
  useDidUpdateEffect(() => {
    if (resultStatus === 500) history.replace('/error/500');
    Actions.base_result_status(false);
  }, [resultStatus]);

  return null;
}

export default ErrorContainer;
