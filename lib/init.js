const fileSearch = require('./files');
const Promise = require('promise');
const { statSync, existsSync: exists } = require('fs');
const { extname } = require('path');
const Epub = require('epub');

import DB from './database';

const Book = DB('Book');

function createBook(book) {
  return {
    title: book.metadata.title,
    author: book.metadata.creator || book.metadata.creatorFileAs || book.metadata.author,
    subject: book.metadata.subject,
    description: book.metadata.description,
    pubDate: book.metadata.date,
    cover: book.metadata.cover,
    chapters: book.flow.map((ch) => Object.assign({
      id: ch.id,
      title: ch.title || ch.id
    })),
    metadata: JSON.stringify(book.metadata)
  }
}

function read(url, i) {
    console.log('estoy funcionando');
    let book = new Epub(url, `/${i}/image/`, `/${i}/read/`);
    const promise = new Promise((resolve, reject) => {
      book.on('end', () => {

        let imgId = book.metadata.cover || (book.manifest['cover-image'] && book.manifest['cover-image'].id) || (book.manifest['book-cover'] && book.manifest['book-cover'].id) || (book.manifest.coverImage && book.manifest.coverImage.id);
        let metadata = Object.assign(createBook(book), { url });
        if(!imgId) {
          Object.assign(metadata, { cover: './glass.png' });
          return resolve(metadata);
        }

        book.getImage(imgId , function(err, img, mimeType) {
          if(err) reject(err);        
          Object.assign(metadata, {
            cover: `data:${mimeType || 'image/jpeg'};base64,${img.toString('base64')}`
          });
          resolve(metadata);
        });
      });
      book.on('error', () => reject('error reading file'));
    });

    book.parse();
    return promise;
}


function filterNewBooks(books=[], bookshelf=null) {
  if(!bookshelf)
    return books;
  if(books.length > 0)
    return books.filter(book => !bookshelf.includes(book));
  return books;
}

export default function initBook(root=process.env.HOME, extensions) {

  return new Promise((resolve, reject) => {

  fileSearch(root, function(err, bookPaths) {
    Book.get().then(books => {

      const newBooks = filterNewBooks(bookPaths, books.length > 0 && books.map(b => b.url));
      if(newBooks.length === 0) {
        return resolve(books);
      }
      Promise.all(newBooks.map(read)).then(arrOfNewBooks => {

        const newBookshelf = books.concat(arrOfNewBooks);

        Book.set(newBookshelf).then(() => resolve(newBookshelf))
          .catch(reject);

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