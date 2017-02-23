var { app, BrowserWindow } = require('electron');
var fs = require('fs');
var path = require('path');

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

if(!fs.existsSync(path.resolve(app.getPath('userData'), 'Book.json'))) {
  fs.writeFileSync(path.resolve(app.getPath('userData'), 'Book.json'),
    '[]');
}

if(!fs.existsSync(path.resolve(app.getPath('userData'), 'config.json'))) {
  fs.writeFileSync(path.resolve(app.getPath('userData'), 'config.json'),
    fs.readFileSync(path.join(__dirname, 'json', 'config.json')));
}

app.on('ready', function() {
  var mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`file://${__dirname}/public/index.html`);
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
    mainWindow.openDevTools();
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
