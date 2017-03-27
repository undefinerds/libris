import { ADD_BOOK, EDIT_BOOK, REMOVE_BOOK } from '../consts';

export default function books(state = [], action) {
  switch (action.type) {
    case ADD_BOOK:
      return [
        ...state,
        action.data
      ];
    case EDIT_BOOK:
      return [
        ...state.slice(0, action.i),
       {
        ...state[action.i],
        ...action.data
      },
        ...state.slice(action.i + 1)
      ];
    case REMOVE_BOOK:
      return [
        ...state.slice(0, action.i),
        ...state.slice(action.i + 1)
      ];
    case 'NEW_BOOKS':
      return [
        ...action.data
      ];
    case 'ADD_BOOKMARK':
      return [
        ...state.slice(0, action.i),
        {
          ...state[action.i],
          bookmarks: [
            ...state.bookmarks,
            action.data
          ]
        },
        ...state.slice(action.i + 1)
      ]
    default:
      return state;
  }
}
