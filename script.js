// Google News RSS Feeds
const indiaNewsFeed = "https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en";
const worldNewsFeed = "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en";

// Free RSS-to-JSON API
const rssToJson = "https://api.rss2json.com/v1/api.json?rss_url=";

// Load News Function
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

        const imgSrc = item.enclosure?.link || item.thumbnail || "https://via.placeholder.com/100x70?text=News";

        div.innerHTML = `
          <img src="${imgSrc}" alt="news">
          <a href="${item.link}" target="_blank">${item.title}</a>
        `;
        container.appendChild(div);
      });
    } else {
      container.innerHTML = "No news available right now.";
    }
  } catch (error) {
    document.getElementById(containerId).innerHTML = "⚠️ Error loading news.";
  }
}

// Refresh News
function refreshNews() {
  loadNews(indiaNewsFeed, "india-news");
  loadNews(worldNewsFeed, "world-news");
  document.getElementById("last-updated").innerText =
    "Last updated at: " + new Date().toLocaleTimeString();
}

// First Load
refreshNews();

// Auto-refresh every 2 minutes
setInterval(refreshNews, 2 * 60 * 1000);
