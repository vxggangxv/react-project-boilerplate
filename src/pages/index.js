import { lazy } from '@loadable/component';

const ErrorPage = lazy(() => import('./error/ErrorPage'));
const HomePage = lazy(() => import('./home/HomePage'));
const AboutPage = lazy(() => import('./about/AboutPage'));

export { ErrorPage, HomePage, AboutPage };

// export { default as HomePage } from './home/HomePage';
// export { default as AboutPage } from './about/AboutPage';
