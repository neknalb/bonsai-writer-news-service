import { Hono } from 'hono';
import newsRoutes from './routes/news.routes.ts';

// Create Hono app
const app = new Hono();

// Middleware for CORS (if needed)
app.use('*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET');
  c.header('Access-Control-Allow-Headers', 'Content-Type');
  await next();
});

// Root route
app.get('/', (c) => {
  return c.json({
    message: 'News API',
    version: '1.0.0',
    endpoints: {
      'GET /news': 'Get available news ordered by date',
    },
  });
});

// News route
app.route('/news', newsRoutes);

// Error handling for unknown routes
app.notFound((c) => {
  return c.json({
    error: 'Route not found',
    message: 'Use /news to get available news ordered by date',
  }, 404);
});

// Export app for testing
export { app };

// Start server
const port = 5042;
console.log(`🚀 Whats-New API running on http://localhost:${port}`);

Deno.serve({ port }, app.fetch);
