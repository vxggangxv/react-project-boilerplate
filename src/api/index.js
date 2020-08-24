import { axs, setHeader } from './config/axiosConfig';
import axios from 'axios';
import * as endPoint from './config/endPoint';

// NOTE: posts
export function postFetchPost(id, data) {
  let axiosConf = { url: `${endPoint.posts}`, method: 'get', data };
  if (id) {
    axiosConf = { url: `${endPoint.posts}/${id}`, method: 'get', data };
  }
  return axs(axiosConf);
}

export function fetchPosts(id) {
  // return axs({ url: `https://jsonplaceholder.typicode.com/todos/${id}`, method: 'get' });
  return axs(endPoint.posts.get(id));
  // return axs(endPoint.posts.get());
  // return endPoint.posts.get(id);
  // const apiAddress = 'https://jsonplaceholder.typicode.com/todos/1';
  // return axios.get(apiAddress);
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
