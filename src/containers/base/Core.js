import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { DispatchActions } from 'store/actionCreators';
import { FullScreenLoading } from 'components/base/loading';
import ErrorContainer from 'containers/base/ErrorContainer';
import { useShallowSelector, useDidUpdateEffect } from 'lib/utils';
import { isAuthenticatedSelector } from 'store/modules/auth.selectors';
import storage, { keys } from 'api/storage';

const CoreState = {
  visible: false,
};

// NOTE: 초기 landing, error, notifications, popup 등록
function Core() {
  const { isAuthenticated } = useShallowSelector(state => ({
    isAuthenticated: isAuthenticatedSelector(state),
  }));
  const { apiCalling, landing, accessToken } = useShallowSelector(state => ({
    apiCalling: state.app.apiCalling,
    landing: state.base.landing,
    accessToken: state.auth.accessToken,
  }));
  const [values, setValues] = useImmer(CoreState);
  const valuesVisible = values.visible;

  // NOTE: user가 없는 경우 == login이 안된경우
  const initialize = async () => {
    const storedUser = storage.get(keys.user);
    // const storedToken = storage.get(keys.token);
    console.log(isAuthenticated, 'isAuthenticated');
    console.log(storedUser, 'storedUser');

    if (!storedUser) {
      DispatchActions.auth_sign_out();
      return;
    }
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
