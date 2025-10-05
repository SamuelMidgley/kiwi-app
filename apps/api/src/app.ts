import { Hono } from "hono";

import { addMiddleware } from "./middleware";
import { Bindings, HonoApp } from "./types";

export const createAppWithMiddleware = (): HonoApp => {
  const app = new Hono<{ Bindings: Bindings }>();

  addMiddleware(app);

  return app;
};
