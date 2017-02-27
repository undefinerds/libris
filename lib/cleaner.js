const ipcRenderer = window.require('electron').ipcRenderer;

export function cleaner() {
  ipcRenderer.send('cleanCache', true);
}

export function cleanStorage() {
  console.log('funciono?');
  ipcRenderer.send('createStorage');
}