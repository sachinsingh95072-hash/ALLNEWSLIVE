// Use RSS-to-JSON API to fetch Google News feeds
const indiaNewsFeed = "https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en";
const worldNewsFeed = "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en";

// Free RSS to JSON API (to bypass CORS issues)
const rssToJson = "https://api.rss2json.com/v1/api.json?rss_url=";

async function loadNews(feedUrl, containerId) {
  try {
    const response = await fetch(rssToJson + encodeURIComponent(feedUrl));
    const data = await response.json();

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (data.items && data.items.length > 0) {
      data.items.slice(0, 6).forEach(item => {
        const div = document.createElement("div");
        div.className = "news-item";
        div.innerHTML = `
          <a href="${item.link}" target="_blank">${item.title}</a>
          <p>${item.pubDate}</p>
        `;
        container.appendChild(div);
      });
    } else {
      container.innerHTML = "No news available right now.";
    }
  } catch (error) {
    document.getElementById(containerId).innerHTML = "Error loading news.";
    console.error(error);
  }
}

loadNews(indiaNewsFeed, "india-news");
loadNews(worldNewsFeed, "world-news");
