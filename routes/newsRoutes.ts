import { Hono } from 'hono';
import { getAllNewsOrderedByDate, NewsOfADate } from '../newsData.ts';

interface AllNewsResponse {
  total: number;
  result: Array<NewsOfADate>;
}

const newsRoutes = new Hono();

// Route for all available dates
newsRoutes.get('/', (c) => {
  // Search for news for the given date
  const news = getAllNewsOrderedByDate();

  const response: AllNewsResponse = {
    total: news.length,
    result: news,
  };

  return c.json(response);
});

export default newsRoutes;
