import lodable, { lazy } from '@loadable/component';

export const Error = lodable(() => import('./error/Error'));
export const Home = lodable(() => import('./home/Home'));
export const Auth = lodable(() => import('./auth/Auth'));
export const About = lodable(() => import('./about/About'));
export const User = lodable(() => import('./user/User'));
export const Test = lodable(() => import('./test/Test'));
export const TestList = lodable(() => import('./test/TestList'));
export const TestDetail = lodable(() => import('./test/TestDetail'));
