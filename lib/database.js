const storage = require('electron-storage');
const { ipcRenderer } = require('electron');
const { resolve: solvePath } = require('path');
const fs = require('fs');

export default function(name, cb=null) {
  const path = `${name}`;

  /*
  const absPath = solvePath(app.getPath("userData"), path);
  if(!fs.existsSync(absPath)) {
    fs.closeSync(fs.openSync(absPath, 'w'));
  }*/
  return {
    get: () => Promise.resolve(storage.get(path)),
    set: (data) => Promise.resolve(storage.set(path, data)),
    //get away of this one, just in EXTREMELY EMERGENCY case
    remove: () => Promise.resolve(storage.remove(path))
  }
}
/*
export function Config(location) {
  return {
    get: () => JSON.parse(fs.readFileSync(resolve(location, 'config.json'), {encoding: "utf8"})),
    set: (options) => fs.writeFileSync(resolve(location, 'config.json'), JSON.stringify(options))
  }
}

*/