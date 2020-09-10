import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { DispatchActions } from 'store/actionCreators';
import { FullScreenLoading } from 'components/base/loading';
import ErrorContainer from 'containers/base/ErrorContainer';
import { useShallowSelector, useDidUpdateEffect } from 'lib/utils';
import { isAuthenticatedSelector } from 'store/modules/auth.selectors';
import storage, { keys } from 'api/config/storage';
import { ToastContainer, toast } from 'react-toastify';
import { NotifyToast } from 'components/base/notifications';
import { PopupContainer } from 'containers/common/popup';

const CoreState = {};

// NOTE: 초기 landing, error, notifications, popup 등록
// DEBUG: 차후 성능적인 문제 발생시 apiCalling분리
function Core() {
  const { isAuthenticated, landing, accessToken, apiCalling } = useShallowSelector(state => ({
    isAuthenticated: isAuthenticatedSelector(state),
    landing: state.base.landing,
    accessToken: state.auth.accessToken,
    apiCalling: state.base.apiCalling,
  }));
  const [values, setValues] = useImmer(CoreState);

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

  const isVisibleLoading = [landing].some(item => item === true);

  return (
    <>
      <FullScreenLoading visible={isVisibleLoading} />
      <ErrorContainer />
      <PopupContainer />
      <NotifyToast />
    </>
  );
}

// export default Core;

export default Core;
