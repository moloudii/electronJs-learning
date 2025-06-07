const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

const isDev = !app.isPackaged;
if (isDev) {
  require("electron-reload")(__dirname);
}

let mainWindow;
// Config For Start Page
const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: true, // Electron 36
    },
  });
  if (!isDev) {
    mainWindow.removeMenu();
  }
  mainWindow.loadFile("./renderer/index.html");
};
// Start Page
app.whenReady().then(() => {
  createMainWindow();
});
// New Renderer (Window)
const showFeed = (event, url) => {
  feedWindow = new BrowserWindow({
    width: 700,
    height: 500,
    alwaysOnTop: true,
    parent: mainWindow,
    webPreferences: {
      sandbox: true,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  feedWindow.loadURL(url);
};
ipcMain.on("show-feed", showFeed);
