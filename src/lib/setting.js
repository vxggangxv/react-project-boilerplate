export const ENV_MODE_DEV = process.env.NODE_ENV === 'development';
export const ENV_MODE_PROD = process.env.NODE_ENV === 'production';

const apiConfig = window.globalConfig;

// const BASE_API_URL = process.env.REACT_APP_API_URL;
export const BASE_API_URL =
  apiConfig?.BASE_API_URL ||
  (ENV_MODE_DEV ? `http://127.0.0.1:13986/launcher/api` : `http://127.0.0.1:13986/launcher/api`);
