import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { DispatchActions } from 'store/actionCreators';
import { FullScreenLoading } from 'components/base/loading';
import ErrorContainer from 'containers/base/ErrorContainer';
import { useShallowSelector, useDidUpdateEffect } from 'lib/utils';
import { isAuthenticatedSelector } from 'store/modules/auth.selectors';

const CoreState = {
  visible: false,
};

// NOTE: 초기 landing, error, notifications, popup 등록
function Core() {
  const { apiCalling, isAuthenticated, landing } = useShallowSelector(state => ({
    apiCalling: state.app.apiCalling,
    isAuthenticated: isAuthenticatedSelector(state),
    landing: state.base.landing,
  }));
  const [values, setValues] = useImmer(CoreState);
  const valuesVisible = values.visible;

  // console.log(apiCalling, 'apiCalling');
  // console.log(isAuthenticated, 'isAuthenticated');
  // console.log(landing, 'landing');

  const initialize = async () => {
    DispatchActions.base_exit_landing();
  };

  useEffect(() => {
    initialize();
  }, []);

  // NOTE: api 호출에 따른 loading
  useDidUpdateEffect(() => {
    setValues(draft => {
      draft.visible = apiCalling;
    });
  }, [apiCalling]);

  if (landing) return null;
  return (
    <>
      <FullScreenLoading visible={valuesVisible} />
      <ErrorContainer />
      {/* Notifications */}
    </>
  );
}

// export default Core;

export default Core;
