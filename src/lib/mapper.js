export const brand = {
  logo: {
    index: 'logo',
    text: 'DOF Bridge',
  },
};

export const setting = {
  language: {
    kr: {
      id: 1,
      label: 'Korean',
      index: 'KR',
    },
    en: {
      id: 2,
      label: 'English',
      index: 'EN',
    },
  },
};

export const pageUrl = {
  index: '/',
  home: '/home',
  auth: {
    index: '/auth',
    signIn: '/auth/login',
    signUp: '/auth/join',
    signOut: '/auth/logout',
    resetPassword: '/auth/reset/password',
  },
  error: {
    index: '/error',
    server: '/error/500',
    notFound: '/error/404',
  },
};

export const navigation = [
  {
    path: pageUrl.home,
    text: 'Home',
    index: 0,
  },
  {
    path: '/about',
    text: 'About',
    index: 1,
  },
  {
    path: '/user',
    text: 'User',
    index: 2,
  },
  {
    path: '/test',
    text: 'Test',
    index: 3,
  },
];
