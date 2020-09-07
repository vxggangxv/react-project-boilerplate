export const setting = {
  language: {
    defs: {
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
    use: {
      default: [1, 2],
    },
  },
};

export const pageUrl = {
  index: '/',
  signIn: '/auth/login',
  signUp: '/auth/join',
  signOut: '/auth/logout',
  resetPassword: '/auth/reset/password',
  error: {
    index: '/error',
    server: '/error/500',
    notFound: '/error/404',
  },
};

export const navigation = [
  {
    path: '/home',
    text: 'Home',
  },
  {
    path: '/auth/login',
    text: 'Login',
  },
  {
    path: '/auth/logout',
    text: 'Logout',
  },
  {
    path: '/about',
    text: 'About',
  },
  {
    path: '/user',
    text: 'User',
  },
  {
    path: '/test',
    text: 'Test',
  },
];
