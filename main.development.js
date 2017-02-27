var { app, BrowserWindow, crashReporter } = require('electron');
var fs = require('fs');
var path = require('path');

var installExtensions = require('./devTools.config');
crashReporter.start({
  productName: 'Libris',
  companyName: 'undefinerds',
  submitURL: 'http://localhost:8080',
  uploadToServer: true
});

let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  if(!fs.existsSync(path.resolve(app.getPath('userData'), 'Libris.json'))) {
    fs.writeFileSync(path.resolve(app.getPath('userData'), 'Libris.json'),
      JSON.stringify({
        books: [],
        config: JSON.parse(fs.readFileSync(path.join(__dirname, 'json', 'config.json')))
    }));
  }
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`file:///${process.cwd()}/public/development.html`);
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.webContents.on('createStorage', function() {
    createStorage();
    mainWindow.webContents.reload();
  });
  
  installExtensions();
  mainWindow.openDevTools();

  mainWindow.webContents.on('cleanCache', function() {
    mainWindow.webContents.session.defaultSession.clearCache(function() {
      console.log('cleaned');
    });
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

function createStorage() {
  return fs.writeFileSync(path.resolve(app.getPath('userData'), 'Libris.json'),
    JSON.stringify({
      books: [],
      config: JSON.parse(fs.readFileSync(path.join(__dirname, 'json', 'config.json')))
    })
  );
}
