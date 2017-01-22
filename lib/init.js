const getEbookPaths = require('./files');
const { extname, join } = require('path');
const { directories } = require('./config.json');
const Book = require('./classes');

directories.forEach((dir) => {
  dir = dir === 'default' ? process.env.HOME : dir;
  getEbookPaths(dir, createBook);
});

const books = [];

function createBook(path) {
  console.log('New one!');
  if(extname(path) === '.epub') {
    let b = new Book(path);
  }
}

/*
async function readEpub(path) {
  if(extname(path) === '.epub') {
    epub(path, '/image', '/chapter', function(book) {
      console.log("EPUB: " +path, book.metadata);
    });
  } else {
    console.log(`OTHER: ${path}`);
  }
}

function epub(...params) {
  let cb = params.pop();
    
}

function showEpub(epub) {
  console.log(epub.metadata);
}
**/