import { acx, setHeader } from './config/axiosConfig';
import axios from 'axios';
import * as endPoints from 'api/endPoints';

// NOTE: posts
export function fetchPosts(id) {
  // return acx(setHeader(endPoints.posts.get(id)));
  return acx(endPoints.posts.get(id));
}
