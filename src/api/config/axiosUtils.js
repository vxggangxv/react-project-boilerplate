import axios from 'axios';
import { ENV_MODE_DEV, ENV_MODE_PROD } from 'lib/setting';

// const domain = ENV_MODE_DEV ? 'http://localhost:3000' : 'http://localhost:3000';
const domain = 'https://jsonplaceholder.typicode.com';

// NOTE: path: api path, config: 기타 설정값 (e.g. timeout: false)
export function request({ path = '', config = {} }) {
  return {
    get(id) {
      if (id) return { url: `${domain + path}/${id}`, method: 'get', ...config };
      return { url: `${domain + path}`, method: 'get', ...config };
    },
    post(data) {
      return { url: `${domain + path}`, method: 'post', data, ...config };
    },
    edit(id, data) {
      return { url: `${domain + path}/${id}`, method: 'put', data, ...config };
    },
    delete(id) {
      return { url: `${domain + path}/${id}`, method: 'delete', ...config };
    },
  };
}

export const setAuthInHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
};

// NOTE: login, logut process
// LOGIN (state, {accessToken}) {
//   if (!accessToken) return
//   state.accessToken = accessToken
//   localStorage.accessToken = accessToken
//   setAuthInHeader(accessToken)
// },
// LOGOUT (state) {
//   state.accessToken = null
//   delete localStorage.accessToken
//   setAuthInHeader(null)
// },
// LOGIN({ commit }, { email, password }) {
//   return auth.login(email, password)
//     .then(({ accessToken }) => commit('LOGIN', { accessToken }))
// },

export default request;
