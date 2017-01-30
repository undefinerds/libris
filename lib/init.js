const Book = require('./Book');
const fileSearch = require('./files');
const Promise = require('promise');
const { statSync, existsSync: exists } = require('fs');
const { extname } = require('path');


export default function initBook(root, extensions) {
  function filter(dir) {
    return !(exists(dir)) ? false :
    (statSync(dir).isFile()) ? extensions.includes(extname(dir).slice(1)) :
    !(/(^\.|\/\.|\\\.|node_modules|virtualenv)/g.test(dir));
  }

  return new Promise((resolve, reject) => {
    fileSearch(root, function(err, books) {
      if(err) reject(err)
      books = books.map(url => new Book(url));
      Promise.all(books.map(b => b.fetchMetadata())).then(resolve, reject);
    }, filter);
  });
}
