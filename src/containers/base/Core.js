import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useSelector, shallowEqual } from 'react-redux';
import { Actions } from 'store/actionCreators';

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
      {/* FullScreenLoading */}
      {/* Notifications */}
    </>
  );
}

// export default Core;

export default connect(({ base }) => ({
  landing: base.landing,
}))(withRouter(Core));
