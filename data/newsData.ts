interface News {
  title: string;
  content: string;
}

export interface NewsOfADate extends News {
  date: string;
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
  ['2021-03-26', {
    title: 'Great News!',
    content: 'Something really great happened!',
  }],
]);

// Exported function for better testability
export function getNewsData(): Map<string, News> {
  return newsData;
}

export function getAllNewsOrderedByDate(): Array<NewsOfADate> {
  const theData = getNewsData();
  return Array.from(theData.entries())
    .map(([date, entry]) => ({
      date,
      ...entry,
    }))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
