const rssUrl = "https://www.asriran.com/fa/rss/allnews";
// window.loadRssFeed(rssUrl).then((response) => console.log(response));
// Electron 36
window.rssApi.loadRssFeed(rssUrl).then((data) => {
  console.log(data);
});
