import api from "./api";

export const helloWorld = async () => {
  return api.get("/hello-world");
};
