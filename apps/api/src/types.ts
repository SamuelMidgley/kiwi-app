import { Hono } from "hono";
import { BlankSchema } from "hono/types";

export type Bindings = {
  WEIGHT_TRACKER: D1Database;
  USERNAME: string;
  PASSWORD: string;
};

export type HonoBindings = { Bindings: Bindings };

export type HonoApp = Hono<HonoBindings, BlankSchema, "/">;
