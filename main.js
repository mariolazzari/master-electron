const { app, BrowserWindow } = require("electron");
const colors = require("colors");
const bcrypt = require("bcryptjs");

console.log(colors.rainbow("ciao ciao"));
bcrypt.hash("myPassword", 10, (err, hash) =>
  console.log("myPassword hashed:", hash)
);

console.log("App is ready:", app.isReady());

setTimeout(() => {
  console.log("App is ready after 2s:", app.isReady());
}, 2000);

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

// before quit event
/*
app.on("before-quit", e => {
  console.log("prevent default quit");
  e.preventDefault();
  console.log("save data and manual quit.");
  app.quit();
});
*/

// window blur

app.on("browser-window-blur", () => {
  console.log("App unfocused");
});

app.on("browser-window-focus", () => {
  console.log("App focused.");
});

// window focused

// app is ready
app.on("ready", () => {
  console.log("App is ready.", app.isReady());
  console.log("desktop", app.getPath("desktop"));
  console.log("user data", app.getPath("userData"));
  console.log("temp", app.getPath("temp"));
  createWindow();
});
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
