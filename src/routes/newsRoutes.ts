import { Hono } from 'hono';
import { getAllNewsOrderedByDate, NewsOfADate } from '../data/newsData.ts';

interface AllNewsResponse {
  total: number;
  result: Array<NewsOfADate>;
}

// Create a newsRoutes object. Optionally you can inject a `dataProvider`.
export function createNewsRoutes(
  // Per default use `getAllNewsOrderedByDate` as `dataProvider`
  dataProvider: () => Array<NewsOfADate> = getAllNewsOrderedByDate,
): Hono {
  const newsRoutes = new Hono();

  // Route for all available dates
  newsRoutes.get('/', (c) => {
    const news = dataProvider();

    const response: AllNewsResponse = {
      total: news.length,
      result: news,
    };

    return c.json(response);
  });

  return newsRoutes;
}

// Default export the newRoutes using `getAllNewsOrderedByDate` as `dataProvider`
const newsRoutes = createNewsRoutes();
export default newsRoutes;
