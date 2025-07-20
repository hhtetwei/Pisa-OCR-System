import {  useCallback, useEffect, useReducer, type ReactNode } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '../api/get-me';
import type { AuthAction, AuthContext, AuthState, } from '../types';
import { authContext } from '../contexts';

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGGED_IN':
      return {
        ...state,
        user: action.payload,
      };

    case 'LOGGED_OUT':
      return {
        ...state,
        user: null,
      };

    case 'LOADED_USER':
      return {
        ...state,
        user: action.payload,
        isLoadingUser: false,
      };

    case 'UNSET_USER':
      return {
        ...state,
        isLoadingUser: false,
        user: null,
      };

    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isLoadingUser: true,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const queryClient = useQueryClient();

  useEffect(() => {
    getCurrentUser()
    .then((user) => {
      dispatch({ type: 'LOADED_USER', payload: user });
      localStorage.setItem('user', JSON.stringify(user));
    })
    .catch(() => dispatch({ type: 'UNSET_USER' }));
  }, []);

  const onLogin: AuthContext['onLogin'] = useCallback(({ data, token }) => {
    localStorage.setItem('token', token);
    dispatch({ type: 'LOGGED_IN', payload: data });
  }, []);

  const onLogout: AuthContext['onLogout'] = useCallback(() => {
    queryClient.clear();
    localStorage.removeItem('token');
    dispatch({ type: 'LOGGED_OUT' });
  }, [queryClient]);

  const onUpdateUser: AuthContext['onUpdateUser'] = useCallback(async (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    dispatch({ type: 'LOADED_USER', payload: data });
  }, []);

  return (
    <authContext.Provider
      value={{
        ...state,
        onLogin,
        onLogout,
        onUpdateUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
