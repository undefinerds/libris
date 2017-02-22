const fileSearch = require('./files');
const Promise = require('promise');
const { statSync, existsSync: exists } = require('fs');
const { extname } = require('path');
const Epub = require('epub');

import DB from './database';

const Book = DB('Book');

function createBook(metadata) {
  return {
    title: metadata.title,
    author: metadata.creator,
    subject: metadata.subject,
    description: metadata.description,
    pubDate: metadata.date,
    cover: metadata.cover
  }
}

function read(url, i) {
    let book = new Epub(url, `/${i}/image/`, `/${i}/read/`);
    const promise = new Promise((resolve, reject) => {
      book.on('end', () => {
        let metadata = {
          url,
          ...createBook(book.metadata),
          metadata: JSON.stringify(book.metadata)
        };
        resolve(metadata);
      });
      book.on('error', () => reject('error reading file'));
    });
    book.parse();
    return promise;
}

/*
export default function initBook(root=process.env.HOME, extensions) {
  function filter(dir='.') {
    return !(exists(dir)) ? false :
    (statSync(dir).isFile()) ? extensions.includes(extname(dir).slice(1)) :
    !(/(^\.|\/\.|\\\.|node_modules|virtualenv|venv)/g.test(dir));
  }
  return db.read().then(() => {
    

    const actualBooks = books.value();

    return new Promise((resolve, reject) => {
    
      fileSearch(root, function(err, bookPaths) {
        if(err) reject(err);
        const newBooks = bookPaths.filter(url => actualBooks.map(b => b.url).includes(url));
        newBooks.map(read.bind(undefined, books));
        Promise.all(newBooks).then((defBooks) => {
            resolve(defBooks);
        });
      }, filter);
    });
  });
}
*/


function filterNewBooks(books, bookshelf) {
  return books.filter(book => !bookshelf.includes(book));
}

export default function initBook(root=process.env.HOME, extensions) {

  return new Promise((resolve, reject) => {

  fileSearch(root, function(err, bookPaths) {
    Book.get().then(books => {
      console.log(books);
      const newBooks = filterNewBooks(bookPaths, books.map(b => b.url));

      Promise.all(newBooks.map(read)).then(arrOfNewBooks => {

        const newBookshelf = books.concat(arrOfNewBooks);

        Book.set(newBookshelf).then(resolve);

      }).catch(reject);
    }).catch(reject);
  }, filter);
  });

  function filter(dir='.') {
    return !(exists(dir)) ? false :
      (statSync(dir).isFile()) ?
      extensions.includes(extname(dir).slice(1)) :
      !(/(^\.|\/\.|\\\.|node_modules|virtualenv|venv)/g.test(dir));
  }

}