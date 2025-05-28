import { assertEquals } from 'jsr:@std/assert';
import { createNewsRoutes } from '../routes/newsRoutes.ts';
import { NewsOfADate } from '../data/newsData.ts';

// Mock-Daten für Tests
const mockNews: NewsOfADate[] = [
  { date: '2024-01-01', title: 'Mock Title 1', content: 'Mock Content 1' },
  { date: '2024-04-02', title: 'Mock Title 2', content: 'Mock Content 2' },
];

Deno.test({
  name: 'GET / returns all news ordered by date',
  async fn() {
    // Erstelle Routes mit Mock-Datenquelle
    const newsRoutes = createNewsRoutes(() => mockNews);

    const response = await newsRoutes.request('/');
    const responseData = await response.json();

    // Assertions
    assertEquals(response.status, 200);
    assertEquals(responseData.total, 2);
    assertEquals(responseData.result.length, 2);
    assertEquals(responseData.result[0].title, 'Mock Title 1');
    assertEquals(responseData.result[1].title, 'Mock Title 2');
  },
});

Deno.test({
  name: 'GET / returns correct structure',
  async fn() {
    const newsRoutes = createNewsRoutes(() => mockNews);

    const response = await newsRoutes.request('/');
    const responseData = await response.json();

    assertEquals(typeof responseData.total, 'number');
    assertEquals(Array.isArray(responseData.result), true);

    responseData.result.forEach((news: unknown) => {
      assertEquals(typeof (news as NewsOfADate).date, 'string');
      assertEquals(typeof (news as NewsOfADate).title, 'string');
      assertEquals(typeof (news as NewsOfADate).content, 'string');
    });
  },
});

Deno.test({
  name: 'GET / handles empty news data',
  async fn() {
    const newsRoutes = createNewsRoutes(() => []);

    const response = await newsRoutes.request('/');
    const responseData = await response.json();

    assertEquals(response.status, 200);
    assertEquals(responseData.total, 0);
    assertEquals(responseData.result.length, 0);
  },
});

Deno.test('Route /nonexistent returns 404', async () => {
  const newsRoutes = createNewsRoutes(() => []);
  const response = await newsRoutes.request('/nonexistent');

  assertEquals(response.status, 404);
});
