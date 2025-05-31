const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({ width: 800, height: 600, alwaysOnTop: true });
  win.loadFile("index.html");
};
app.whenReady().then(() => {
  createWindow();
});
console.log("Hello world in ELECTRON");
