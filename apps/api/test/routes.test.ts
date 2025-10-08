import { SELF } from "cloudflare:test";
import { expect, it } from "vitest";

it("hello world", async () => {
  const base64AuthCreds = btoa("USERNAME" + ":" + "PASSWORD");

  const response = await SELF.fetch("https://example.com/hello-world", {
    headers: {
      Authorization: `Basic ${base64AuthCreds}`,
    },
  });

  expect(response.status).toBe(200);
});
