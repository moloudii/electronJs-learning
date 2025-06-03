const rssUrl = "https://www.asriran.com/fa/rss/allnews";
// window.loadRssFeed(rssUrl).then((response) => console.log(response));
// Electron 36
window.rssApi.loadRssFeed(rssUrl).then((rssFeedData) => {
  console.log(rssFeedData);

  rssFeedData.items.forEach(addRssItem);
});

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
