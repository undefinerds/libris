import { SHOW, HIDE, ADD_BOOK, EDIT_BOOK, REMOVE_BOOK } from './consts';
import initializeURL from '../lib/init';
const Epub = require('epub');
import config from './config';
import Promise from 'promise';

export function addBook(name, author, data) {
  return {
    type: ADD_BOOK
  }
}

export function editBook(i, data) {
  return {
    type: EDIT_BOOK,
    data,
    i
  }
}


export function deleteBook(i) {
  return {
    type: REMOVE_BOOK,
    i
  }
}

export function updateLoader(type) {
  return {
    type
  }
}

export function updateStore(type, data) {
  return {
    type,
    data
  }
}

export function showError(type, error) {
  console.error(error);
  return {
    type,
    error
  }
}

function read(url) {
    let book = new Epub(url, '/image/', '/chapter/');
    const promise = new Promise((resolve, reject) => {
      book.on('end', () => resolve(book));
      book.on('error', () => reject('error reading file'));
    });
    book.parse();
    return promise;
}

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

function getImage(book, imgId) {
  console.log(imgId);
  return new Promise((resolve, reject) => {
    if(!imgId)
      resolve('/glass.png');
    book.getImage(imgId, function(err, img, mimeType) {
      if(!!err) reject(err);
      resolve(`data:${mimeType || 'image/jpeg'};base64,${img.toString('base64')}`);
    });
  });
}

function initEbook(bookPath) {
  return new Promise((resolve, reject) => {
    read(bookPath).then(book => {
        let metadata = createBook(book.metadata);
        metadata.url = bookPath;
        getImage(book, book.metadata.cover)
        .then(img => {
          metadata.cover = img;
          metadata.chapters = book.flow;
          resolve(metadata);
        }).catch(reject);
    }).catch(reject);
  });
}

export function initializeStore() {
  return function (dispatch) {
    const dir = (config.directory === 'default') ? process.env.HOME : config.directory;
    dispatch(updateLoader(SHOW));
    initializeURL(dir, config.extensions).then(bookPaths => {
      Promise.all(bookPaths.map(initEbook)).then(books => {
        dispatch(updateLoader(HIDE));  
        return dispatch(updateStore('NEW', books));
      }).catch(e => { dispatch(showError('LOG', e)) });
    }).catch(e => { dispatch(showError('LOG', e)) });
  };
}


export function setFormValues(values) {
  return {
    type: 'UPDATE_VALUE',
    values
  }
}

export function updateForm(value, matches, style) {
  return function (dispatch) {
    dispatch(setFormValues({value, style}));
    console.log('al menos funciono ' + value);
    return dispatch(updateMatches(matches));
  }
}

export function updateMatches(matches) {
  return {
    type: 'UPDATE_MATCH',
    matches
  }
}
