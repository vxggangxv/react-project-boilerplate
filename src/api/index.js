import { axs, setHeader } from './config/axiosConfig';
import endPoint from './endPoint';

// NOTE: posts
export function postFetchPost(id, data) {
  let axiosConf = { url: `${endPoint.posts}`, method: 'get', data };
  if (id) {
    axiosConf = { url: `${endPoint.posts}/${id}`, method: 'get', data };
  }
  return axs(axiosConf);
}

export function fetchPosts() {
  let axiosConf = { url: `${endPoint.posts}`, method: 'get' };
  return axs(axiosConf);
}

export function fetchPostById(id) {
  const axiosConf = { url: `${endPoint.posts}/${id}`, method: 'get' };
  return axs(axiosConf);
}

export function editPost(data) {
  const axiosConf = { url: `${endPoint.posts}/edit`, method: 'post', data };
  return axs(axiosConf);
}

export function deletePost(data) {
  const axiosConf = { url: `${endPoint.posts}/delete`, method: 'post', data };
  return axs(axiosConf);
}
