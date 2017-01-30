import { SHOW, HIDE, ADD_BOOK, EDIT_BOOK, REMOVE_BOOK } from './consts';
import initializeURL from '../lib/init';
import config from './config';


export function addBook(name, author, data) {
  return {
    type: ADD_BOOK
  }
}

export function editBook(name: string | void, author: string | void, data, i: number) {
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

export function loader(type) {
  console.log(type);
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
  console.log(error);
  return {
    type,
    error
  }
}

export function initializeStore() {
  return function (dispatch) {
    let dir = (config.directory === 'default') ? process.env.HOME : dir;
    dispatch(loader(SHOW));
    initializeURL(dir, config.extensions).then(books => {
      dispatch(loader(HIDE));
      return dispatch(updateStore('NEW', books));
    }).catch(e => { dispatch(showError('LOG', e)) });
  };
}

