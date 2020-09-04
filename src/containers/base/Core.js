import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { DispatchActions } from 'store/actionCreators';
import { FullScreenLoading } from 'components/base/loading';
import ErrorContainer from 'containers/base/ErrorContainer';
import { useShallowSelector, useDidUpdateEffect } from 'lib/utils';
import { isAuthenticatedSelector } from 'store/modules/auth.selectors';
import storage from 'api/storage';
import * as mapper from 'lib/mapper';

const CoreState = {
  visible: false,
};

// NOTE: 초기 landing, error, notifications, popup 등록
function Core() {
  const { apiCalling, landing, accessToken } = useShallowSelector(state => ({
    apiCalling: state.app.apiCalling,
    landing: state.base.landing,
    accessToken: state.auth.accessToken,
  }));
  const [values, setValues] = useImmer(CoreState);
  const valuesVisible = values.visible;

  const initialize = async () => {
    // const storedUser = storage.get(mapper.storage.user);
    const storedToken = storage.get(mapper.storage.token);
    // console.log(storedUser, 'storedUser');

    // TEST: removeToken
    storage.remove(mapper.storage.token);
    if (!storedToken) {
      DispatchActions.set_token(null);
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
