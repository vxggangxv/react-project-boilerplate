import axios from 'axios';
import { ENV_MODE_DEV, ENV_MODE_PROD } from 'lib/setting';

// const domain = ENV_MODE_DEV ? 'http://localhost:3000' : 'http://localhost:3000';
const domain = 'https://jsonplaceholder.typicode.com';

class Request {
  constructor(props) {
    this.path = props.path;
  }
  get(id) {
    if (id) return { url: `${domain + this.path}/${id}`, method: 'get' };
    return { url: `${domain + this.path}`, method: 'get' };
  }
  post(data) {
    return { url: `${domain + this.path}`, method: 'post', data };
  }
  edit(id, data) {
    return { url: `${domain + this.path}/${id}`, method: 'put', data };
  }
  delete(id) {
    return { url: `${domain + this.path}/${id}`, method: 'delete' };
  }
}

class Acx extends Request {
  constructor(props) {
    super({
      path: props.path,
    });
  }
  syncResultCheck() {}
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

export default Acx;
