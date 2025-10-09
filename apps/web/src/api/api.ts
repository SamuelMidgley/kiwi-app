import axiosBuilder, { type Options } from "redaxios";

import { getAuthValue } from "./utils";

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw Error("Base url not set");
}

const apiInstance = axiosBuilder.create({
  baseURL: BASE_URL,
});

const get = <T>(url: string, config?: Options) => {
  return apiInstance.get<T>(url, {
    ...config,
    auth: getAuthValue(),
  });
};

const deleteRequest = (url: string) => {
  return apiInstance.delete(url, {
    auth: getAuthValue(),
  });
};

const post = <T>(url: string, body: T) => {
  return apiInstance.post(url, body, {
    auth: getAuthValue(),
  });
};

const api = {
  apiInstance,
  get,
  delete: deleteRequest,
  post,
};

export default api;
