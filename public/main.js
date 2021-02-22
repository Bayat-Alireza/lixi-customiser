const { app, BrowserWindow, session } = require("electron");
require("@electron/remote/main");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1600,
    height: 1100,
    titleBarStyle: "customButtonsOnHover",
    title: "LIXI Customiser",
    webPreferences: {
      enableRemoteModule: true,
      contextIsolation: true,
    },
  });
  win.loadURL("http://localhost:3000");
  win.setTitle("LIXI Customiser");
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common to applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it is common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
