const fs = require('fs');
const path = require('path');

module.exports = function (root=process.env.HOME) {
  var core = {
    readdir: (dir='', opt) => {
      if(!path.isAbsolute(dir) || !path.isAbsolute(root))
        dir = path.join(root, dir);
      const promise = new Promise((resolve, reject) => {
        fs.readdir(dir, function(err, files) {
          if(err)
            reject(err.message);
          if(!!opt.onlyFiles)
            files = files.filter((filename) => fs.statSync(path.join(dir, filename)).isFile());
          if(!!opt.showHidden)
            resolve(files);
          if(Array.isArray(files))
            resolve(files.filter((filename) => filename[0] !== '.'));
          else
            resolve(files);
        });
      });
      return promise;
    }
  }
  return {
    list: (path, showHidden) => core.readdir(path, { onlyFiles: false, showHidden }),
    fileList: (path, showHidden) => core.readdir(path, { onlyFiles: true, showHidden })
  }
}