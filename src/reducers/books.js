import { ADD_BOOK, EDIT_BOOK, REMOVE_BOOK } from '../consts';

export default function books(state: Array = [], action: Object) {
  switch (action.type) {
    case ADD_BOOK:
      return [
        ...state,
        action.payload.book
      ];
    case EDIT_BOOK:
      return [
        ...state.slice(0, action.payload.i),
        action.payload.book,
        ...state.slice(action.payload.i + 1)
      ];
    case REMOVE_BOOK:
      return [
        ...state.slice(0, action.payload.i),
        ...state.slice(action.payload.i + 1)
      ];
    default:
      return state;
  }
}