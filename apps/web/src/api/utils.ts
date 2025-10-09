import { getStoredUser } from "@/use-auth";

type AuthValue = {
  username: string;
  password: string;
};

export const getAuthValue = (authValue: AuthValue | null = null) => {
  let username;
  let password;

  if (authValue) {
    username = authValue.username;
    password = authValue.password;
  } else {
    const { username: usernameFromStorage, password: passwordFromStorage } =
      getStoredUser() ?? {};

    username = usernameFromStorage;
    password = passwordFromStorage;
  }

  const base64AuthCreds = btoa(username + ":" + password);

  return `Basic ${base64AuthCreds}`;
};
