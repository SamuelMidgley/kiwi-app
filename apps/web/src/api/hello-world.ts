import api from "./api";
import { getAuthValue } from "./utils";

export const helloWorld = async (username: string, password: string) => {
  return api.apiInstance.get("/hello-world", {
    auth: getAuthValue({ username, password }),
  });
};
