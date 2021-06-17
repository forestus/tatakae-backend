import malScraper from 'mal-scraper';

const searchUrl: any[] = [];
export async function searchDescription(anime: string, maxResults: number) {
  const names: any[] = [];
  const element = [];
  const dataUrl = await malScraper.getResultsFromSearch(anime);
  await dataUrl.map((Anime) => {
    searchUrl.push(Anime.url);
    return searchUrl;
  });
  const promiseUrl = await Promise.resolve(searchUrl);
  await Promise.all(
    promiseUrl.map(async (url) => {
      const infoFromUrl = await malScraper.getInfoFromURL(url);
      names.push({
        name: infoFromUrl.title.replaceAll('☆', ' '),
        episodes: infoFromUrl.episodes,
        picture: infoFromUrl.picture,
        score: infoFromUrl.score,
        aired: infoFromUrl.aired,
        status: infoFromUrl.status,
        genres: infoFromUrl.genres,
        synopsys: infoFromUrl.synopsis,
        anime: ''
      });
      return names;
    })
  );
  for (let i = 0; i < maxResults; i++) {
    element.push(names[i]);
  }
  return element;
}
