import { basicAuth } from "hono/basic-auth";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

import { HonoApp } from "./types";

export const addMiddleware = (app: HonoApp) => {
  app.use(
    "*",
    cors({
      origin: "*",
    })
  );

  app.use("*", async (c, next) => {
    const auth = basicAuth({
      username: c.env.USERNAME,
      password: c.env.PASSWORD,
    });

    return auth(c, next);
  });

  app.use("*", async (c, next) => {
    try {
      await next();
    } catch (error) {
      console.log("ARGHHHHHH");
      let message = "Oopsy something went wrong";

      if (
        error &&
        typeof error == "object" &&
        "message" in error &&
        typeof error.message == "string"
      ) {
        message = error.message;
      }

      throw new HTTPException(500, { message });
    }
  });
};
