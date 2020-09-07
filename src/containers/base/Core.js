import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { DispatchActions } from 'store/actionCreators';
import { FullScreenLoading } from 'components/base/loading';
import ErrorContainer from 'containers/base/ErrorContainer';
import { useShallowSelector, useDidUpdateEffect } from 'lib/utils';
import { isAuthenticatedSelector } from 'store/modules/auth.selectors';
import storage, { keys } from 'api/storage';
import { ToastContainer, toast } from 'react-toastify';
import { NotifyToast } from 'components/base/notifications';

const CoreState = {
  visible: false,
};

// NOTE: 초기 landing, error, notifications, popup 등록
function Core() {
  const { isAuthenticated, apiCalling, landing, accessToken } = useShallowSelector(state => ({
    isAuthenticated: isAuthenticatedSelector(state),
    apiCalling: state.base.apiCalling,
    landing: state.base.landing,
    accessToken: state.auth.accessToken,
  }));
  const [values, setValues] = useImmer(CoreState);
  const valuesVisible = values.visible;

  // NOTE: 초기화 함수
  // user가 없는 경우 == login이 안된경우, autn_sign_out() 실행
  const initialize = async () => {
    const storedUser = storage.get(keys.user);
    // const storedToken = storage.get(keys.token);

    if (!storedUser) {
      await DispatchActions.sign_out();
    }
    DispatchActions.exit_landing();
  };

  useEffect(() => {
    initialize();
  }, []);

  // NOTE: landing 및 api 호출에 따른 loading show
  useDidUpdateEffect(() => {
    setValues(draft => {
      draft.visible = isVisibleLoading;
    });
  }, [apiCalling]);

  const isVisibleLoading = [apiCalling, landing].some(item => item === true);

  return (
    <>
      <FullScreenLoading visible={isVisibleLoading} />
      <ErrorContainer />
      <NotifyToast />
    </>
  );
}

// export default Core;

export default Core;
