var { app, BrowserWindow } = require('electron');

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  var mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`file:///${process.cwd()}/public/index.html`);
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
