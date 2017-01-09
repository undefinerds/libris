const getEbookPaths = require('./files');
const { extname } = require('path');
const { directories } = require('./config.json');

class Book {
  constructor(name, author, genre, editorial, pubDate, url) {
    this.name = name;
    this.author = author;
    this.genre = genre;
    this.pubDate = pubDate;
    this.url = url;
  }

  edit(changes) {
    //TO DO: sanitize changes
    Object.assign(this, changes);
  }

  getData() {
    //TO DO: Really get the data
    return "Working on it!";
  }
}

directories.forEach((dir) => {
  dir = dir === 'default' ? process.env.HOME : dir;
  getEbookPaths(dir, createBook, () => 'finished!');
});

function createBook(path) {
    extname(path) === '.epub' ?
    console.log(`EPUB: ${path}`) :
    console.log(`OTHER: ${path}`)
}