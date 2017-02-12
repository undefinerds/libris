var { app, BrowserWindow, crashReporter } = require('electron');
var installExtensions = require('./devTools.config');
crashReporter.start({
  productName: 'Libris',
  companyName: 'undefinerds',
  submitURL: 'http://localhost:8080',
  uploadToServer: true
});

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
  
    installExtensions();
    mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
