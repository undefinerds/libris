import { ADD_BOOK, EDIT_BOOK, REMOVE_BOOK } from '../consts';

export default function books(state = [], action: Object) {
  switch (action.type) {
    case ADD_BOOK:
      return [
        ...state,
        action.data
      ];
    case EDIT_BOOK:
      return [
        ...state.slice(0, action.i),
        action.data.book,
        ...state.slice(action.i + 1)
      ];
    case REMOVE_BOOK:
      return [
        ...state.slice(0, action.i),
        ...state.slice(action.i + 1)
      ];
    case 'NEW':
      return [
        ...state,
        ...action.data
      ]
    default:
      return state;
  }
}
