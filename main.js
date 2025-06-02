const path = require("path");
const { app, BrowserWindow } = require("electron");
require("electron-reload")(__dirname);

let win;
const createMainWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: false,
    },
  });
  win.loadFile("./index.html");
};
app.whenReady().then(() => {
  createMainWindow();
});
console.log("Hello world in ELECTRON");
