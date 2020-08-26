import { acx, setHeader } from './config/axiosConfig';
import * as endPoints from 'api/endPoints';

// NOTE: posts
export function fetchPosts(id) {
  return acx(endPoints.posts.get(id));
}
