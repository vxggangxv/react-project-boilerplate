import lodable, { lazy } from '@loadable/component';

// NOTE: test용
export const Counter = lodable(() => import('./test/__test__/Counter'));
export const TodoApp = lodable(() => import('./test/__test__/todo/TodoApp'));
export const DelayedToggle = lodable(() => import('./test/__test__/DelayedToggle'));
export const UserProfile = lodable(() => import('./test/__test__/UserProfile'));
export const Test = lodable(() => import('./test/Test'));
export const TestList = lodable(() => import('./test/TestList'));
export const TestDetail = lodable(() => import('./test/TestDetail'));

export const Error = lodable(() => import('./error/Error'));
export const Home = lodable(() => import('./home/Home'));
export const Auth = lodable(() => import('./auth/Auth'));
export const About = lodable(() => import('./about/About'));
export const User = lodable(() => import('./user/User'));
