import { Hono } from 'hono';
import {
  getAllNewsOrderedByDate,
  NewsOfADate,
} from '../services/news.service.ts';

interface AllNewsResponse {
  total: number;
  result: Array<NewsOfADate>;
}

// Create a newsRoutes object. Optionally you can inject a `dataProvider`.
export function createNewsRoutes(
  // Per default use `getAllNewsOrderedByDate` as `dataProvider`
  dataProvider: () => Promise<Array<NewsOfADate>> = getAllNewsOrderedByDate,
): Hono {
  const newsRoutes = new Hono();

  // Route for all available dates
  newsRoutes.get('/', async (c) => {
    try {
      const news = await dataProvider();

      const response: AllNewsResponse = {
        total: news.length,
        result: news,
      };
      return c.json(response);
    } catch {
      return c.json({ error: 'Failed to fetch news' }, 500);
    }
  });

  return newsRoutes;
}

// Default export the newRoutes using `getAllNewsOrderedByDate` as `dataProvider`
const newsRoutes = createNewsRoutes();
export default newsRoutes;
