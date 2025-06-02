const { contextBridge } = require("electron");
const Parser = require("rss-parser");
const parser = new Parser();

const loadRssFeed = async (url) => {
  return await parser.parseURL(url);
};
contextBridge.exposeInMainWorld("loadRssFeed", loadRssFeed);
