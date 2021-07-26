import React, { createContext, useEffect, useState } from 'react';
import { useDidUpdateEffect, useShallowSelector } from 'lib/utils';
import { useLocation } from 'react-router-dom';
import { cutUrl } from 'lib/library';
import _ from 'lodash';
import { isLogInSelector } from 'store/modules/auth';

export const AppContext = createContext();

export function AppProvider({ value, children }) {
  const { user, isLogin, signUpSuccess, signUpFailure, signOutSuccess } = useShallowSelector(
    state => ({
      user: state.user.user,
      isLogin: isLogInSelector(state),
      signUpSuccess: state.auth.signUp.success,
      signUpFailure: state.auth.signUp.failure,
      signOutSuccess: state.auth.signOut.success,
    }),
  );
  const { pathname } = useLocation();
  const isProjectPage = `${cutUrl(pathname)}` === 'project';
  const isAuthPage = `${cutUrl(pathname)}` === 'auth';
  const userCode = user?.userCode;

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}

// export const useAppContextValue = () => {
//   const value = useContext(AppContext);
//   return value;
// };
