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
  const response = await app.request('/nonexistent');
  const data = await response.json();

  assertEquals(response.status, 404);
  assertEquals(data, {
    error: 'Route not found',
    message: 'Use /news to get available news ordered by date',
  });
});

Deno.test('CORS headers are set correctly', async () => {
  const response = await app.request('/');

  assertEquals(response.headers.get('Access-Control-Allow-Origin'), '*');
  assertEquals(response.headers.get('Access-Control-Allow-Methods'), 'GET');
  assertEquals(
    response.headers.get('Access-Control-Allow-Headers'),
    'Content-Type',
  );
});

Deno.test('CORS headers are set for /news route', async () => {
  const response = await app.request('/news');

  assertEquals(response.headers.get('Access-Control-Allow-Origin'), '*');
  assertEquals(response.headers.get('Access-Control-Allow-Methods'), 'GET');
  assertEquals(
    response.headers.get('Access-Control-Allow-Headers'),
    'Content-Type',
  );
});

// Deno.test('Route /news calls newsRoutes', async () => {
// TO BE IMPLEMENTED
// });
