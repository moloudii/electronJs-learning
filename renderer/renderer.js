// const rssUrl = "https://www.asriran.com/fa/rss/allnews";
// https://www.irna.ir/rss

// Auto Render
const getRssFeedUrls = () => {
  return JSON.parse(localStorage.getItem("rssFeedUrls")) ?? [];
};

const urlFeeds = getRssFeedUrls();
const getRssFeed = (feed) => {
  window.rssApi.loadRssFeed(feed?.url).then((rssFeedData) => {
    rssFeedData?.items.forEach(addRssItem);
  });
};
urlFeeds.forEach((feed) => {
  getRssFeed(feed);
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

// Auto Render
window.addEventListener("storage", () => {
  const currentFeeds = getRssFeedUrls();
  if (currentFeeds.length > urlFeeds.length) {
    const newFeed = currentFeeds.length[currentFeeds.length - 1];
    urlFeeds.push(newFeed);
    getRssFeed(newFeed);
  }
});
