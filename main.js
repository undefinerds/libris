const { app, BrowserWindow } = require('electron');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadURL(`file://${__dirname}/src/dos.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
})
.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit();
});

