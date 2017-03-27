const fileSearch = require('./files');
const Promise = require('promise');
const { statSync, existsSync: exists } = require('fs');
const { extname, join } = require('path');
const Epub = require('epub');
import {cleaner, cleanStorage} from './cleaner';
import DB from './database';

const Libris = DB('Libris');

function createBook(book) {
  return {
    title: book.title,
    author: book.creator || book.creatorFileAs || book.author,
    subject: book.subject || 'sin categoría',
    description: book.description,
    pubDate: book.date,
    cover: book.cover || join(process.cwd(), 'public', 'glass.png'),
    views: 0,
    url: book.url,
    hidden: false,
    metadata: JSON.stringify(book)
  }
}

function read(url, i) {
    let book = new Epub(url, `/epub/${i}/image/`, `/epub/${i}/read/`);
    const promise = new Promise((resolve, reject) => {
      book.on('end', () => {

        let imgId = book.metadata.cover || (book.manifest['cover-image'] && book.manifest['cover-image'].id) || (book.manifest['book-cover'] && book.manifest['book-cover'].id) || (book.manifest.coverImage && book.manifest.coverImage.id);
        let metadata = Object.assign(createBook(book.metadata), {
          url,
          chapters: book.flow.map((ch) => Object.assign({
            id: ch.id,
            title: ch.title || ch.id })),
          type: 'epub'
        });
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


function filterNewBooks(books=[], bookshelf=[]) {
  console.log(bookshelf);
  let newBookPaths = books.filter(book => !(bookshelf.includes(book)));
  console.log(newBookPaths);
  return newBookPaths.map((url, i) => {
    if(extname(url).toLowerCase() === '.epub') {
      return read.call(undefined, url, i);
    } else {
      console.log('pdf?');
      return {
        ...createBook({ url }),
        type: extname(url).slice(1)
      };
    }
  });
}

export default function initStore() {

  return new Promise((resolve, reject) => {
    Libris.get().then(store => {
      const { books, config: { directory, extensions } } = store;
      const root = (directory.toLowerCase() === 'default') ? process.env.HOME : directory;

    fileSearch(root, function(err, bookPaths) {

      const newBooks = filterNewBooks.call(undefined, bookPaths, books.map(b => b.url));

      Promise.all(newBooks).then(arrOfNewBooks => {
        cleaner();
        const newBookshelf = books.concat(arrOfNewBooks);

        store.books = newBookshelf;

        Libris.set(store).then(() => resolve(store))

          .catch(reject);
      }).catch(reject);
    }, filter.bind({ extensions }));
    }).catch((e) => {
      cleanStorage();
    });
  });

  function filter(dir='.') {
    return !(exists(dir)) ? false :
      (statSync(dir).isFile()) ?
      this.extensions.includes(extname(dir).slice(1)) :
      !(/(^\.|\/\.|\\\.|node_modules|virtualenv|venv)/g.test(dir));
  }

}
