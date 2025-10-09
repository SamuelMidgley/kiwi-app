import * as React from "react";

export type User = {
  username: string;
  password: string;
};

export type TAuthContext = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  user: User | null;
};

export const AuthContext = React.createContext<TAuthContext | null>(null);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

const key = "tanstack.auth.user";

export function getStoredUser(): User | null {
  const storedUser = localStorage.getItem(key);
  return storedUser ? JSON.parse(storedUser) : null;
}

export function setStoredUser(user: User | null) {
  if (user) {
    localStorage.setItem(key, JSON.stringify(user));
  } else {
    localStorage.removeItem(key);
  }
}
