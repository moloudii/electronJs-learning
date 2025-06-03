// const rssUrl = "https://www.asriran.com/fa/rss/allnews";
const urlFeeds = JSON.parse(localStorage.getItem("rssFeedUrls")) ?? [];
urlFeeds.forEach((feed) => {
  window.rssApi.loadRssFeed(feed.url).then((rssFeedData) => {
    rssFeedData.items.forEach(addRssItem);
  });
});

// window.loadRssFeed(rssUrl).then((response) => console.log(response));
// Electron 36

const addRssItem = (item) => {
  const newsWrapper = document.getElementById("news-wrapper");
  const template = document.getElementById("news-card");
  const newsCard = template.content.cloneNode(true);
  newsCard.querySelector("a").href = item.link;
  newsCard.querySelector("img").src = item.enclosure?.url;
  newsCard.querySelector("h3").innerText = item.title;
  newsCard.querySelector("p").innerText = item.content ?? " ";
  newsWrapper.append(newsCard);
};

// New Renderer (Window)
document.getElementById("news-wrapper").addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (link) {
    e.preventDefault();
    window.showFeed(e.target.closest("a").href);
  }
});
// New RSS Window (Window)
document
  .querySelector("button")
  .addEventListener("click", () => window.showRssForm());
