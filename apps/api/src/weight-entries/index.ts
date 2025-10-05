import { Hono } from "hono";
import { HonoBindings } from "../types";
import { zValidator } from "@hono/zod-validator";
import { CREATE, DELETE, SELECT, UPDATE } from "./sql";
import { createValidator, updateValidator } from "./validators";

const app = new Hono<HonoBindings>()
  .get("/", async (c) => {
    const { results } = await c.env.WEIGHT_TRACKER.prepare(SELECT).run();

    return c.json(results);
  })
  .post("/", zValidator("json", createValidator), async (c) => {
    const { weight, dateRecorded } = c.req.valid("json");

    const { success } = await c.env.WEIGHT_TRACKER.prepare(CREATE)
      .bind(weight, dateRecorded.toUTCString())
      .run();

    return c.json({
      success,
    });
  })
  .patch("/:id", zValidator("json", updateValidator), async (c) => {
    const id = c.req.param("id");
    const { dateRecorded, weight } = c.req.valid("json");

    const { success } = await c.env.WEIGHT_TRACKER.prepare(UPDATE)
      .bind(weight, dateRecorded.toUTCString(), id)
      .run();

    return c.json({
      success,
    });
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");

    const { success } = await c.env.WEIGHT_TRACKER.prepare(DELETE)
      .bind(id)
      .run();

    return c.json({
      success,
    });
  });

export default app;
