const { app, BrowserWindow } = require("electron");
const colors = require("colors");

console.log(colors.rainbow("ciao ciao"));
// prevent garbage collector
let mainWindow;

const createWindow = () => {
  console.log("create win");

  // main window properties
  mainWindow = new BrowserWindow({
    width: 1000,
    heoght: 800,
    webPreferences: { nodeIntegration: true }
  });

  // load index file in main window
  mainWindow.loadFile("index.html");
  // open dev tools
  mainWindow.webContents.openDevTools();
  // subscribe close event
  mainWindow.on("close", () => (mainWindow = null));
};

// app is ready
app.on("ready", createWindow);
// quit on all windows closed
app.on("window-all-closed", () => {
  if (process.platform === "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
