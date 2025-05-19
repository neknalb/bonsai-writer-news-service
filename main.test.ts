import { assertEquals } from "jsr:@std/assert"
import { app } from "./main.ts"

Deno.test("Unknown routes return 404 with correct error message", async () => {
  const testPath = "/foobar"
  const response = await app.request(testPath)
  const data = await response.json()

  assertEquals(response.status, 404)
  assertEquals(data, {
    error: "Route not found",
    message: "Use /whats-new/:date to get news for a specific date"
  })
})