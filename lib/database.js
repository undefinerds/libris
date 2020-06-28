const storage = require('electron-storage');
const { resolve: solvePath } = require('path');
const fs = require('fs');

export default function(filepath) {

  return {
    get: () => storage.get(filepath),
    set: (data) => storage.set(filepath, data),
    //get away of this one, just in EXTREMELY EMERGENCY case
    remove: () => Promise.resolve(storage.remove(filepath))
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