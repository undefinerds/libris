import * as consts from './consts';
export function addBook(name, author, data) {
  return {
    type: consts.ADD_BOOK
  }
}

export function editBook(name: string | void, author: string | void, data, i: number) {
  return {
    type: consts.EDIT_BOOK
  }
}

export function deleteBook(i) {
  return {
    type: consts.REMOVE_BOOK
  }
}