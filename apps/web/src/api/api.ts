import axiosBuilder, { type Options } from "redaxios";

import localStorageHelper from "@/utils/localStorageHelper";

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw Error("Base url not set");
}

const apiInstance = axiosBuilder.create({
  baseURL: BASE_URL,
});

const get = <T>(url: string, config?: Options) => {
  const { username, password } = localStorageHelper.getUser() ?? {};

  const base64AuthCreds = btoa(username + ":" + password);

  return apiInstance.get<T>(url, {
    ...config,
    auth: `Basic ${base64AuthCreds}`,
  });
};

const deleteRequest = (url: string) => {
  const { username, password } = localStorageHelper.getUser() ?? {};

  const base64AuthCreds = btoa(username + ":" + password);

  return apiInstance.delete(url, {
    auth: `Basic ${base64AuthCreds}`,
  });
};

const post = <T>(url: string, body: T) => {
  const { username, password } = localStorageHelper.getUser() ?? {};

  const base64AuthCreds = btoa(username + ":" + password);

  return apiInstance.post(url, body, {
    auth: `Basic ${base64AuthCreds}`,
  });
};

const api = {
  get,
  delete: deleteRequest,
  post,
};

export default api;
