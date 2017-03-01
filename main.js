var { app, BrowserWindow } = require('electron');
var fs = require('fs');
var path = require('path');

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

let mainWindow = null;

app.on('ready', function() {
  if(!fs.existsSync(path.join(app.getPath('userData'), 'Libris.json'))) {
    createStorage();
  }
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname +'/public/index.html');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
    mainWindow.openDevTools();
  });

  mainWindow.webContents.on('createStorage', function() {
    createStorage();
    mainWindow.webContents.reload();
  });

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
