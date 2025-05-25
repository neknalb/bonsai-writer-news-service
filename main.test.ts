import { assertEquals } from 'jsr:@std/assert';
import { app } from './main.ts';

Deno.test('Root route returns API information', async () => {
  const response = await app.request('/');
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data, {
    message: 'News API',
    version: '1.0.0',
    endpoints: {
      'GET /news': 'Get available news ordered by date',
    },
  });
});

Deno.test('Unknown routes return 404 with correct error message', async () => {
  const testPath = '/foobar';
  const response = await app.request(testPath);
  const data = await response.json();

  assertEquals(response.status, 404);
  assertEquals(data, {
    error: 'Route not found',
    message: 'Use /news to get available news ordered by date',
  });
});

Deno.test('Route /news returns available news ordered by date', async () => {
  const testPath = '/news';
  const response = await app.request(testPath);
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data, {
    total: 2,
    result: [
      {
        date: '2023-04-01',
        title: 'April Fools Day',
        content: 'Hello world! LOL',
      },
      {
        date: '2023-04-02',
        title: 'Birthday',
        content: 'Today, Michaela has brithday!',
      },
    ],
  });
});
