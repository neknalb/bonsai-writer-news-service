interface News {
  title: string;
  content: string;
}

export interface NewsOfADate extends News {
  date: string;
}

// Exported function for better testability
export async function getNewsData(): Promise<Map<string, News>> {
  console.log('call to getNewsData');
  return await loadNewsData();
}

export async function getAllNewsOrderedByDate(): Promise<Array<NewsOfADate>> {
  console.log('call to getAllNewsOrderedByDate');
  const theData = await getNewsData();
  console.log('received data: ' + theData.size);
  return Array.from(theData.entries())
    .map(([date, entry]) => ({
      date,
      ...entry,
    }))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

async function loadNewsData(): Promise<Map<string, News>> {
  console.log('call to loadNewsData');
  const newsData: Map<string, News> = new Map();
  const dataDirPath = './data';

  for await (const entry of Deno.readDir(dataDirPath)) {
    console.log('did load some file');
    if (entry.isFile && entry.name.endsWith('.md')) {
      const filePath = `${dataDirPath}/${entry.name}`;
      const content = await Deno.readTextFile(filePath);
      const title = content.split('\n')[0].replace('# ', '').trim();
      const body = content.split('\n').slice(1).join('\n').trim();
      const date = entry.name.replace('.md', '');
      newsData.set(date, { title, content: body });
    }
  }

  return newsData;
}
