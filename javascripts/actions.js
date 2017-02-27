import { SHOW, HIDE, ADD_BOOK, EDIT_BOOK, REMOVE_BOOK, INSTRUCTIONS } from './consts';
import initializeURL from '../lib/init';
import {cleaner as cleanCache} from '../lib/cleaner';
const Epub = require('epub');
import path from 'path';
import Promise from 'promise';


export function addBook(name, author, data) {
  return {
    type: ADD_BOOK
  }
}

export function editBook(data, i) {
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

export function updateBooks(books) {
  return {
    type: 'NEW_BOOKS',
    data: books
  }
}

export function updateConfig(config) {
  return {
    type: 'NEW_CONFIG',
    data: config
  }
}

export function showError(type, error) {
  console.error(error);
  return {
    type,
    error
  }
}

export function read(url, i) {
    let book = new Epub(url, `/${path.extname(url).slice(1)}/${i}/image/`, `/${path.extname(url).slice(1)}/${i}/read/`);
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

export function getImage(book, imgId) {
  return new Promise((resolve, reject) => {
    if(!imgId)
      resolve('./glass.png');
    book.getImage(imgId, function(err, img, mimeType) {
      if(!!err) reject(err);
      resolve(`data:${mimeType || 'image/jpeg'};base64,${img.toString('base64')}`);
    });
  });
}


function initEbook(book, i) {
  return new Promise((resolve, reject) => {
        let metadata = createBook(book);
        getImage(book, metadata.cover)
        .then(img => {
          metadata.cover = img;
          metadata.chapters = book.flow;
          resolve(metadata);
        }).catch(reject);
    });
}

export function initializeStore() {
  return function(dispatch) {
    dispatch(updateLoader(SHOW));
    initializeURL().then(store => {
      dispatch(updateBooks(store.books));
      dispatch(updateConfig(store.config));
      cleanCache();
      dispatch(updateForm('', store.books.map((_, i) => i)));
      dispatch(updateLoader(HIDE));
      dispatch(changeWelcomeMessage(0));
      return dispatch(showWelcome());
    }).catch(e => dispatch(showError('LOG', e)));
  }
}



export function setFormValues(values) {
  return {
    type: 'UPDATE_VALUE',
    values
  }
}

export function updateForm(style, matches) {
  return function (dispatch) {
    dispatch(setFormValues({ style }));
    return dispatch(updateMatches(matches));
  }
}

export function updateMatches(matches) {
  return {
    type: 'UPDATE_MATCH',
    data: matches
  }
}

function getChapter(book, chapterId) {
  return new Promise((resolve, reject) => {
    book.getChapter(chapterId, function(err, text) {
      if(err) reject(err);
      resolve(text);
    });
  });
}

export function updateChapter(bookId, i, data) {
  console.log(data);
  return {
    type: 'UPDATE_CHAPTER',
    bookId,
    i,
    data
  }
}


export function updateReadable(type, data=null, e=null) {
  return function(dispatch) {
    if(e) dispatch(showError('LOG', e));
    else return dispatch({
      type,
      data
    });
  }
}

export function startReading() {
  return function(dispatch) {
    return dispatch({
      type: 'START_TIMER'
    });
  }
}

export function stopReading() {
  return function(dispatch) {
    return dispatch({
      type: 'STOP_TIMER'
    });
  }
}

export function toggleWelcome() {
  return function(dispatch) {
    return dispatch(showWelcome());
  }
}

export function showWelcome() {
  return {
    type: 'TOGGLE_WELCOME'
  }
}

export function updateMessage(i) {
  return function(dispatch) {
    return dispatch(changeWelcomeMessage(i));
  }
}

export function changeWelcomeMessage(i=0) {
  return {
    type: 'UPDATE_MESSAGE',
    i,
    data: INSTRUCTIONS[i]
  }
}

export function removeInstrucions(key) {
  return {
    type: 'REMOVE_INSTRUCTION',
    key
  }
}