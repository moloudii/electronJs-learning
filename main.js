const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const Parser = require("rss-parser");
require("electron-reload")(__dirname);

let win;
const createMainWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: true, // Electron 36
    },
  });
  win.loadFile("./renderer/index.html");
};
// 📡 IPC Listener: get Feed request from renderer { electron 36 }
ipcMain.handle("rss:load", async (event, url) => {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(url);
    return feed;
  } catch (error) {
    return { error: error.message };
  }
});
app.whenReady().then(() => {
  createMainWindow();
});
console.log("Hello world in ELECTRON");
