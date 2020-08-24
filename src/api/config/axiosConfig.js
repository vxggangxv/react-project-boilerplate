import _ from 'lodash';
import axios from 'axios';

/**
 *
 * @param {*} axiosConf object
 * 통신할때 필요한 axios의 config 값을 넣어줍니다.
 * @param {*} config object
 * {header:false} 라고 할 시 header 체크를 하지 않습니다.
 */
/**
 * 
   "result": 1,
   "headers": {
       "loginUserCode": "",
       "x-access-token": null
   }
     "result": 1,
   "headers": {
       "loginUserCode": "",
       "x-access-token": null
   }
 */
const { CancelToken } = axios;
const source = CancelToken.source();

export function axs(axiosConf, config = {}) {
  const defaultConfig = { header: true };
  const mergeConfig = _.merge(defaultConfig, config);
  const hasData = axiosConf.data;
  axiosConf.cancelToken = source.token;
  if (hasData) {
    axiosConf.data.url = axiosConf.url;
  }
  if (mergeConfig && mergeConfig.header) {
    if (axiosConf.timeout !== false) axiosConf.timeout = 10000;

    return axios(axiosConf)
      .catch(err => ({ error: err }))
      .then(res => {
        const { data, error } = res;
        // NOTE: 완료되지 않음
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
          return { cancel: true };
        }
        try {
          if (data) {
            // Actions.base_network_connect({ value: data.headers?.onlineState });
            // Actions.base_message_get({ value: data.headers?.notReadMessage });
            // if (data.result === 5 && ENV_MODE_PROD) Actions.base_result_status(5);
          }
        } catch (err) {
          // 오류 처리
          console.log(err, 'error');
          console.error('Response Data is undefined');
          const errorConf = {
            // url:"http://localhost:9999/errortest",
            url: endPoint.post_error_meesage,
            method: 'post',
            data: {
              url: axiosConf.url,
              payload: axiosConf,
              statusCode: err.statusCode,
              message: err.message,
              stack: err.stack,
            },
          };

          axios(errorConf).catch(err => ({ error: err, payload: axiosConf.data }));
          // NOTE: isAuthenticated false로 로그인화면으로 이동
          // Popup({
          //   title: '오류',
          //   content: '인증기간이 만료되었습니다.',
          //   isOpen: true,
          // });
          // AUTH_LOGOUT_SAGAS();
        }
        res.data.payload = axiosConf.data;
        return res;
      });
  }
  return axios(axiosConf).catch(err => ({ error: err, payload: axiosConf.data }));
}

// export function axiosCancel() {
//   source.cancel('Operation canceled');
// }

/**
 * Test Server Set Header
 * @param {} axiosConf
 */
export function setHeader(axiosConf) {
  // NOTE: receiver : 20Jan31-0001
  // NOTE: sender : 20Feb12-0002
  let headerObj;
  if (ENV_MODE_DEV) {
    headerObj = {
      headers: {
        'x-access-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTA3MjhmOWUtZDI3Mi00YmVkLTkwYTQtNDliMzUyNTYwYzQzIiwiaWF0IjoxNTgxMDUzMTA2LCJleHAiOjE1ODEwNTMxMDd9.rYK8C5f7SRFrn_1RRX9cxTHsNH9csKmXqmwhbwGsrkY',
        loginUserCode: '20Jan31-0001',
      },
    };
  }
  Object.assign(axiosConf.data, headerObj);
  return axiosConf;
}
