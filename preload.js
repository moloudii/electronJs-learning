const { contextBridge, ipcRenderer } = require("electron");

// New Renderer (Window)
const showFeed = (url) => {
  ipcRenderer.send("show-feed", url);
};
contextBridge.exposeInMainWorld("showFeed", showFeed);

// Fetch Data From json-server
contextBridge.exposeInMainWorld("newsAPI", {
  getAll: async () => {
    const res = await fetch("http://localhost:5151/data");
    return res.json();
  },
  filterByCategory: async (cat) => {
    const res = await fetch(
      `http://localhost:5151/data?category=${encodeURIComponent(cat)}`
    );
    return res.json();
  },
});
