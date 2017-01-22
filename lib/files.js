const { statSync: fstats } = require('fs');
const { extname, join } = require('path');
const fsReader = require('./fsreader');
const { extensions } = require('./config.json');


/* GET EBOOK PATH OF FILES
**
** params:
**
** (dir) String, directory to search
** (next) Function, instructions to call for every path
** (callback) Function, instructions to call and
** send the final list of file paths
**
*/

module.exports = function getEbookPaths(dir, next, callback) {
  var files = [];
  fsReader(dir).list()
  .then((list) => {
    list.forEach((filename, i) => {
      var path = join(dir, filename);
      if(fstats(path).isDirectory()){
        getEbookPaths(path, next, function(err, f){
          if(err) {
            return callback(err);
          }
          files.concat(f);
        });
      }
      if(extensions.length === 0 || extensions.includes(extname(path).substr(1).toLowerCase())) {
        files.push(path);
        next.call(undefined, path);
      }
      if(i === list.length - 1) {
        callback(null, files);
      }
    });
  })
  .catch(err => err);
}
