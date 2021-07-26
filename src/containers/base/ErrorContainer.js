import { cutUrl } from 'lib/library';
// import { toast } from 'react-toastify';
// import { CustomToastContent } from 'components/base/notifications';
import { pageUrl } from 'lib/mapper';
import storage, { deleteCookie, keys } from 'lib/storage';
import { useShallowSelector } from 'lib/utils';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthActions, BaseActions, UserActions } from 'store/actionCreators';

function ErrorContainer(props) {
  const { responseStatus } = useShallowSelector(state => ({
    responseStatus: state.base.responseStatus,
  }));
  const history = useHistory();
  const { pathname } = useLocation();
  const isAuthPage = cutUrl(pathname) === 'auth';

  // NOTE: Error Status 에 따른 toast 알림
  const responseStatusConfig = {
    status400() {
      // toast.error(() => <CustomToastContent message="Bad Request" />);
      // AppActions.show_toast({ type: 'error', message: 'Bad Request' });
    },
    status401() {
      // toast.error(() => <CustomToastContent message="Unauthorized" />);
      // AppActions.show_toast({ type: 'error', message: 'Unauthorized' });
      // TODO: signOut api 연동
      // AuthActions.sign_out_request();
      // NOTE: returnPath 사용 위해 별도 관리
      deleteCookie(keys.sign_in_token);
      deleteCookie(keys.remember_user_token);
      storage.remove(keys.user);
      UserActions.set_user(null);
      AuthActions.set_access_token(null);
      // persist 삭제
      storage.remove(`persist:${keys.persist}`);
      sessionStorage.removeItem(`persist:${keys.persist}`);
      //
      // NOTE: PrivateRoute에서 관리, 필요시 추가
      // if (!isAuthPage)
      //   history.push(`${pageUrl.auth.signIn}?returnPath=${encodeURIComponent(pathname)}`);
    },
    status403() {
      // toast.error(() => <CustomToastContent message="Forbidden" />);
      // AppActions.show_toast({ type: 'error', message: 'Forbidden' });
      console.log('goBack');
      history.goBack();
    },
    status404() {
      // toast.error(() => <CustomToastContent message="Not Found" />);
      // AppActions.show_toast({ type: 'error', message: 'Not Found' });
      history.replace(pageUrl.error.notFound);
    },
    status405() {
      // toast.error(() => <CustomToastContent message="Method Not Allowd" />);
      // AppActions.show_toast({ type: 'error', message: 'Method Not Allowd' });
    },
    status409() {
      // toast.error(() => <CustomToastContent message="Conflict" />);
      // AppActions.show_toast({ type: 'error', message: 'Conflict' });
    },
    status429() {
      // toast.error(() => <CustomToastContent message="Too many Requests" />);
      // AppActions.show_toast({ type: 'error', message: 'Too many Requests' });
    },
    status500() {
      history.replace(pageUrl.error.server);
    },
  };
  // const responseStatus401 = () => toast({type: 'error', message: 'Will close after 7s', { autoClose: 7000 }});

  // NOTE: 500에러발생시 replace
  // test용 useEffect
  useEffect(() => {
    // useDidUpdateEffect(() => {
    if (!responseStatus) return;
    if (responseStatus) {
      responseStatusConfig[`status${responseStatus}`]();
      BaseActions.response_status(false);
      return;
    }
  }, [responseStatus]);

  return null;
}

export default ErrorContainer;
