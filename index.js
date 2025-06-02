const path = require("path");
const { app, BrowserWindow } = require("electron");
const electronReload = require("electron-reload")(__dirname);

const createMainWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("index.html");
};
app.whenReady().then(() => {
  createMainWindow();
});
console.log("Hello world in ELECTRON");
