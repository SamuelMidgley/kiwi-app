import { Hono } from "hono";
import { Bindings, HonoApp } from "./types";
import { addMiddleware } from "./middleware";

export const createAppWithMiddleware = (): HonoApp => {
  const app = new Hono<{ Bindings: Bindings }>();

  addMiddleware(app);

  return app;
};
