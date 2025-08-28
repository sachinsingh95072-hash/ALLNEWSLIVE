// Function to load RSS feeds
async function loadNews() {
  const indiaFeed = "https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en";
  const worldFeed = "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en";

  // Function to fetch and display RSS
  async function fetchFeed(url, elementId) {
    try {
      const response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(url));
      const data = await response.json();
      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents, "application/xml");

      let items = xml.querySelectorAll("item");
      let html = "<ul>";
      items.forEach((el, index) => {
        if (index < 10) { // Show top 10 headlines
          html += `<li><a href="${el.querySelector("link").textContent}" target="_blank">${el.querySelector("title").textContent}</a></li>`;
        }
      });
      html += "</ul>";

      document.getElementById(elementId).innerHTML = html;
    } catch (error) {
      document.getElementById(elementId).innerHTML = "⚠️ Error loading news.";
    }
  }

  fetchFeed(indiaFeed, "india-news");
  fetchFeed(worldFeed, "world-news");
}

// Load news on page load
loadNews();

// Refresh news every 2 minutes
setInterval(loadNews, 120000);
