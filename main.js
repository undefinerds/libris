var { app, BrowserWindow, crashReporter } = require('electron');

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
  const mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`file://{__dirname}/public/index.html`);
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  if (process.env.NODE_ENV !== 'production') {
    mainWindow.openDevTools();
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
