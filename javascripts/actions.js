import { SHOW, HIDE, ADD_BOOK, EDIT_BOOK, REMOVE_BOOK } from './consts';
import bookshelf from '../lib/bookshelf';

export function addBook(name, author, data) {
  return {
    type: ADD_BOOK
  }
}

export function editBook(name: string | void, author: string | void, data, i: number) {
  return {
    type: EDIT_BOOK
  }
}

export function deleteBook(i) {
  return {
    type: REMOVE_BOOK
  }
}

export function loader(active) {
  let type = active ? SHOW : HIDE;
  return {
    type
  };
}

export function updateStore(type, data) {
  return {
    type,
    payload: data
  }
}

export function initializeStore() {
  return (dispatch) => {
    dispatch(loader(true));
    bookshelf.init().then((books) => {
      dispatch(updateStore('NEW', books));
      dispatch(loader(false));
    }).catch(err => dispatch(showError(err)));
  };
}

