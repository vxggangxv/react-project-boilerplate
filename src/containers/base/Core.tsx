import I18nLanguage from 'components/base/language/I18nLanguage';
import FullScreenLoading from 'components/base/loading/FullScreenLoading';
import ErrorContainer from 'containers/base/ErrorContainer';
import ToastsContainer from 'containers/base/ToastsContainer';
import PopupsContainer from 'containers/common/popup/PopupsContainer';
import { useShallowSelector } from 'lib/utils';
import React, { useEffect } from 'react';
import { RootState } from 'store';
import { AppActions } from 'store/actionCreators';
import { useAppSelector, useShallowAppSelector } from 'store/hooks';

// NOTE: 초기 landing, error, notifications, popup 등록
// DEBUG: 차후 성능적인 문제 발생시 apiCalling분리
function Core() {
  // const { apiCalling } = useShallowSelector((state: RootState) => ({
  //   apiCalling: state.app.apiCalling,
  // }));
  // const { apiCalling } = useAppSelector(state => ({
  const { apiCalling } = useShallowAppSelector(state => ({
    apiCalling: state.app.apiCalling,
  }));

  // NOTE: 초기화 함수
  // user가 없는 경우 == login이 안된경우, autn_sign_out() 실행
  const initialize = async () => {
    // AppActions.set_api_calling_status();
    // if (!user && ) {
    //   history.push(pageUrl.auth.signOut);
    // }
    // AppActions.exit_landing();
  };

  useEffect(() => {
    initialize();
  }, []);

  // useEffect(() => {
  //   console.log(apiCalling, 'apiCalling');
  //   console.log(landing, 'landing');
  //   console.log(toasts, 'toasts');
  //   // BaseActions.response_status(400);
  //   console.log(popups, 'popups');
  // }, [apiCalling, landing, toasts, popups]);

  useEffect(() => {
    console.log(apiCalling, 'apiCalling');
  }, [apiCalling]);

  useEffect(() => {
    // BaseActions.base_popup({
    //   isOpen: true,
    //   title: 'Title',
    //   content: 'Cotnent',
    // });
    // AppActions.add_popup({
    //   isOpen: true,
    //   title: 'Title1',
    //   content: 'Cotnent1',
    //   hideBackdrop: true,
    // });
    // AppActions.add_popup({
    //   isOpen: true,
    //   title: 'Title2',
    //   content: 'Cotnent2',
    //   hideBackdrop: true,
    // });
  }, []);

  const isVisibleLoading = [apiCalling].some(item => item === true);

  return (
    <>
      <FullScreenLoading visible={isVisibleLoading} type="linear" />
      <ErrorContainer />
      {/* 하위 호환용 차후 전체 변경 고려 */}
      {/* <PopupContainer /> */}
      <PopupsContainer />
      <ToastsContainer />
      {/* <NotifyToast /> */}
      <I18nLanguage />
    </>
  );
}

// export default Core;

export default Core;
