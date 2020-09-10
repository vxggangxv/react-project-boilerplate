import { axs, setHeader } from './config/axiosConfig';
import * as endPoints from 'api/endPoints';

// NOTE: posts
export function fetchPosts(id) {
  return axs(endPoints.posts.get(id));
}
// fetchPostById
// editPostById
// deletePostById
