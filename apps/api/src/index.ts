import { createAppWithMiddleware } from "./app";
import weightEntries from "./weight-entries";

const app = createAppWithMiddleware();

app.get("/hello-world", async (c) => {
  return c.text("hello-world");
});

app.route("weight-entries", weightEntries);

export default app;
