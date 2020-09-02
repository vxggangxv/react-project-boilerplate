import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useSelector, shallowEqual } from 'react-redux';
import { Actions } from 'store/actionCreators';
import { FullScreenLoading } from 'components/base/loading';
import ErrorContainer from 'containers/base/ErrorContainer';

// NOTE: 초기 landing, error, notifications, popup 등록
function Core() {
  const base = useSelector(state => state);

  const initialize = async () => {
    Actions.base_exit_landing();
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <ErrorContainer />
      {/* <FullScreenLoading /> */}
      {/* Notifications */}
    </>
  );
}

// export default Core;

export default Core;
