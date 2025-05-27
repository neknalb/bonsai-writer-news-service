interface News {
  title: string;
  content: string;
}

export interface NewsOfADate extends News {
  date: string;
}

export function getAllNewsOrderedByDate(): Array<NewsOfADate> {
  return Array.from(newsData.entries()).map(([date, entry]) => ({
    date,
    ...entry,
  }));
}

// Sample data (replace with real database later)
const newsData: Map<string, News> = new Map([
  ['2023-04-01', {
    title: 'A humorous article about April Fools Day.',
    content: 'Hello world! LOL',
  }],
  ['2023-04-02', {
    title: 'Birthday',
    content: 'Today, Michaela has birthday!',
  }],
]);
