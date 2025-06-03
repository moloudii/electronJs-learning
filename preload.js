const { contextBridge, ipcRenderer } = require("electron");
// const Parser = require("rss-parser");
// const parser = new Parser();

// const loadRssFeed = async (url) => {
//   return await parser.parseURL(url);
// };

// ٍElectron 36
contextBridge.exposeInMainWorld("rssApi", {
  loadRssFeed: async (url) => {
    return await ipcRenderer.invoke("rss:load", url);
  },
});
