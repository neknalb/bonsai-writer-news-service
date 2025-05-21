import { assertEquals } from "jsr:@std/assert";
import { app } from "./main.ts";

Deno.test("Unknown routes return 404 with correct error message", async () => {
  const testPath = "/foobar";
  const response = await app.request(testPath);
  const data = await response.json();

  assertEquals(response.status, 404);
  assertEquals(data, {
    error: "Route not found",
    message: "Use /whats-new/:date to get news for a specific date",
  });
});

Deno.test("Route /whats-new returns available dates", async () => {
  const testPath = "/whats-new";
  const response = await app.request(testPath);
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data, {
    message: "Available dates",
    dates: ["2023-04-01", "2023-04-02"],
    total: 2,
  });
});

Deno.test("Route /whats-new/:date returns news for a specific date", async () => {
  const testPath = "/whats-new/2023-04-01";
  const response = await app.request(testPath);
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data, {
    date: "2023-04-01",
    news: {
      id: "1",
      date: "2023-04-01",
      title: "April Fools Day",
      content: "Hello world! LOL",
    },
  });
});
