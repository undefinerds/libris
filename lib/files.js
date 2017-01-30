var fs = require('fs');
var path = require('path');
 
function readFile(dir, done, passedFilter) {

  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) { return done(err);}
 
    var pending = list.length;
    if (!pending){ return done(null, results);}
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      if(!passedFilter || passedFilter(file)) {
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            readFile(file, function(err, res) {
              results = results.concat(res);
              if (!--pending) done(null, results);
            }, passedFilter);
          } else {
            results.push(file);
            if(!--pending) done(null, results);
          }
        });
      } else {
        if(!--pending) done(null, results);
      }
    });
  });
}

module.exports = readFile;