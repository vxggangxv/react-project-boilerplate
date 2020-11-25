import { axs } from './config/axiosConfig';
import { api_address } from 'lib/setting';
import request from './config/axiosUtils';

export const test = request({ path: '/todos', config: { timeout: false } });
const todoPath = `${api_address}/todos`;
// fetchPosts
// fetchPostById
// editPostById
// deletePostById
export function fetchTests() {
  return axs(test.get());
  // return axs({ url: `${todoPath}`, method: 'get' });
}
export function fetchTestById(id) {
  return axs(test.get(id));
  // return axs({ url: `${todoPath}/${id}`, method: 'get' });
}
