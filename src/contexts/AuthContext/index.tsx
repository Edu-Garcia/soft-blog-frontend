import React, { useState, createContext, useEffect } from 'react';
import { IAuthContext, IAuthProvider, IContextUser, ISessionResponse } from './types';
import toastMsg, { ToastType } from '../../utils/toastMsg';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProvider): React.ReactElement => {
  const [token, setToken] = useState<string | null>(null);

  const [user, setUser] = useState<IContextUser>({} as IContextUser);

  useEffect(() => {
    const userToken = localStorage.getItem('TOKEN_KEY');
    const userId = localStorage.getItem('USER_ID');
    const userRole = localStorage.getItem('USER_ROLE');

    if (userToken && userId && userRole) {
      setToken(userToken);
      setUser({
        id: userId,
        role: userRole,
      });
    }
  }, []);

  const signOut = (): void => {
    setToken(null);
    setUser({ id: null, role: null });

    localStorage.removeItem('TOKEN_KEY');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('USER_ROLE');
  };

  const signIn = (data: ISessionResponse): void => {
    try {
      const { token: dataToken, user: dataUser } = data;

      setToken(dataToken);
      setUser({
        id: dataUser.id,
        role: dataUser.role,
      });

      localStorage.setItem('TOKEN_KEY', dataToken);
      localStorage.setItem('USER_ID', dataUser.id);
      localStorage.setItem('USER_ROLE', dataUser.role);
    } catch (error) {
      toastMsg(ToastType.Error, 'Internal Server Error!');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        signIn,
        signOut,
        signed: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
