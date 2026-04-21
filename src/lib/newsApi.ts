export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string | null;
  guid: string;
}

const RSS_JSON_URL = "https://api.rss2json.com/v1/api.json?rss_url=https://finance.yahoo.com/news/rssindex";

export const fetchMarketNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch(RSS_JSON_URL);
    if (!response.ok) throw new Error("Failed to fetch news from RSS provider");
    
    const data = await response.json();
    if (data.status !== "ok") throw new Error(data.message || "Invalid RSS feed response");

    // Map and sanitize the response data
    const items: NewsItem[] = data.items.map((item: any) => {
      // Clean up description (rss2json often leaves HTML tags in description)
      let cleanDesc = item.description || "";
      cleanDesc = cleanDesc.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
      cleanDesc = cleanDesc.substring(0, 150) + (cleanDesc.length > 150 ? '...' : '');

      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: cleanDesc,
        thumbnail: item.thumbnail || item.enclosure?.link || null,
        guid: item.guid,
      };
    });

    return items;
  } catch (error) {
    console.error("Error fetching market news:", error);
    return [];
  }
};
