import React from 'react';
import { ReactNode, useEffect } from 'react';
import * as auth from 'services/auth';
import { User } from 'types/project';
import { http } from 'lib/fetch';
import { AuthForm } from 'types/auth';
import { useAsync } from 'hooks/useAsync';
import { Loading } from 'components/Loading';
import { FallbackError } from 'components/FallbackError';

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http('me', { token });
    user = data.user;
  }
  return user;
};

export const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (format: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser
  } = useAsync<User | null>();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (format: AuthForm) => auth.register(format).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useEffect(() => {
    run(bootstrapUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isIdle || isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <FallbackError error={error || null} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};
