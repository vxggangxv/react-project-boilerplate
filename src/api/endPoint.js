const ENV_MODE_DEV = process.env.NODE_ENV === 'development';
const ENV_MODE_PROD = process.env.NODE_ENV === 'production';

const domain = ENV_MODE_DEV ? 'http://localhost:3000' : 'http://localhost:3000';

export default endPoint = {
  posts: `${domain}/posts`,
};

