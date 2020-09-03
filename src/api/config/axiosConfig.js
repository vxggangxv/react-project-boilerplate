import _ from 'lodash';
import axios from 'axios';
import { ENV_MODE_DEV, ENV_MODE_PROD } from 'lib/setting';

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
  }
 */

// NOTE: 취소 토큰
const { CancelToken } = axios;
const source = CancelToken.source();

export function acx(axiosConf) {
  // axiosConf.cancelToken = source.token;
  // NOTE: 차후 cancel 필요시 추가 개발
  // if (axiosConf.cancel) source.cancel('Operation canceled');

  // NOTE: 기본 타임아웃: 10초
  if (axiosConf.timeout !== false) axiosConf.timeout = 10000;

  // NOTE: 보낸 데이터 payload data 확인용
  if (axiosConf.data) {
    axiosConf.data.url = axiosConf.url;
  } else {
    axiosConf.data = {
      url: axiosConf.url,
    };
  }
  axiosConf.data.method = axiosConf.method;

  return axios(axiosConf)
    .then(response => {
      // console.log(response.data);
      // console.log(response.status);
      // console.log(response.statusText);
      // console.log(response.headers);
      // console.log(response.config);
      // NOTE: 보낸 데이터 payload data 확인용
      response.data.payload = axiosConf.data;
      return response;
    })
    .catch(error => {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log('Error response', error.response.data);
        console.log('Error response', error.response.status);
        console.log('Error response', error.response.headers);
        // NOTE: 차후 auth에 대한 에러처리
        // const { status } = error.response;
        // if (status === 401) return onUnauthorized();
      } else if (error.resquest) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        console.log('Error request', error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log('Error message', error.message);
      }
      // NOTE: 보낸 데이터 payload data 확인용
      return { error, payload: axiosConf.data };
    });
}

// NOTE: DOFSync 사용
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
