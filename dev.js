var { app, BrowserWindow, crashReporter, ipcMain, session } = require('electron');
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
  
  installExtensions();
  mainWindow.openDevTools();

  ipcMain.on('cleanCache', function() {
    session.defaultSession.clearCache(function() {
      console.log('cleaned');
    });
  });

  ipcMain.on('createStorage', (event) => {
    fs.writeFileSync('./funciono.txt', 'creo que si');
    createStorage();
  });

  ipcMain.on('closed', function() {
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