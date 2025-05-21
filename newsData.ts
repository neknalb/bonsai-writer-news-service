// Interface for news entries
export interface NewsEntry {
  id: string;
  date: string;
  title: string;
  content: string;
}

export function getNewsData(date: string): NewsEntry | undefined {
  return newsData.get(date);
}

export function getAvailableDates(): Array<string> {
  return [...newsData.keys()];
}

// Sample data (replace with real database later)
const newsData: Map<string, NewsEntry> = new Map([
  ["2023-04-01", {
    id: "1",
    date: "2023-04-01",
    title: "April Fools Day",
    content: "Hello world! LOL",
  }],
  ["2023-04-02", {
    id: "2",
    date: "2023-04-02",
    title: "Birthday",
    content: "Today, Michaela has brithday!",
  }],
]);
