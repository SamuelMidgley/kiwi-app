import * as React from "react";

import {
  AuthContext,
  getStoredUser,
  setStoredUser,
  type User,
} from "./use-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(getStoredUser());
  const isAuthenticated = !!user;

  const logout = React.useCallback(() => {
    setStoredUser(null);
    setUser(null);
  }, []);

  const login = React.useCallback((username: string, password: string) => {
    setStoredUser({
      username,
      password,
    });
    setUser({ username, password });
  }, []);

  React.useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext>
  );
}
