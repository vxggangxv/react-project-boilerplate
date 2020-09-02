import lodable, { lazy } from '@loadable/component';

export const Error = lodable(() => import('./error/Error'));
export const Home = lodable(() => import('./home/Home'));
export const About = lodable(() => import('./about/About'));
export const Test = lodable(() => import('./test/Test'));
export const TestList = lodable(() => import('./test/TestList'));
export const TestDetail = lodable(() => import('./test/TestDetail'));
