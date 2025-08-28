// India News (Google RSS feed)
async function loadIndiaNews() {
  try {
    let rssUrl = `https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en`;
    let res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(rssUrl));
    let data = await res.json();

    let indiaNewsDiv = document.getElementById("india-news");
    indiaNewsDiv.innerHTML = "";

    if (data.items && data.items.length > 0) {
      data.items.slice(0, 10).forEach(article => {
        let div = document.createElement("div");
        div.className = "news-item";
        div.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.pubDate}</p>
          <a href="${article.link}" target="_blank">Read more</a>
        `;
        indiaNewsDiv.appendChild(div);
      });
    } else {
      indiaNewsDiv.innerHTML = "No India news available right now.";
    }
  } catch (error) {
    document.getElementById("india-news").innerHTML = "⚠️ Failed to load India news.";
  }
}

// World News (Google RSS feed)
async function loadWorldNews() {
  try {
    let rssUrl = `https://news.google.com/rss?hl=en&gl=US&ceid=US:en`;
    let res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(rssUrl));
    let data = await res.json();

    let worldNewsDiv = document.getElementById("world-news");
    worldNewsDiv.innerHTML = "";

    if (data.items && data.items.length > 0) {
      data.items.slice(0, 10).forEach(article => {
        let div = document.createElement("div");
        div.className = "news-item";
        div.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.pubDate}</p>
          <a href="${article.link}" target="_blank">Read more</a>
        `;
        worldNewsDiv.appendChild(div);
      });
    } else {
      worldNewsDiv.innerHTML = "No world news available right now.";
    }
  } catch (error) {
    document.getElementById("world-news").innerHTML = "⚠️ Failed to load world news.";
  }
}

// Load on start
loadIndiaNews();
loadWorldNews();
