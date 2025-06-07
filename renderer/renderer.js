import { category } from "../constants/category.js";

const newsWrapper = document.getElementById("news-wrapper");
const categoryTitle = document.getElementById("category");
const addRssItem = (item) => {
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

// Fetch Data From json-server
const getAllNews = async () => {
  const all = await window.newsAPI.getAll();
  newsWrapper.replaceChildren();
  all.forEach(addRssItem);
};
getAllNews();

// Fetch Data By Category
document
  .getElementById("category-filter")
  .addEventListener("click", async (e) => {
    const cat = +e.target.dataset.category;
    const list =
      cat === 0
        ? await window.newsAPI.getAll()
        : await window.newsAPI.filterByCategory(cat);
    newsWrapper.replaceChildren();
    category.forEach((i) => {
      i.id === cat ? (categoryTitle.innerHTML = i.name) : null;
    });

    list.forEach(addRssItem);
  });
