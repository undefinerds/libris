import { SHOW, HIDE } from '../consts';

export default function loader(state={}, action) {
  switch(action.type) {
    case SHOW:
      return Object.assign({}, state, {
        show: 'visible'
      });
    case HIDE:
      return Object.assign({}, state, {
        show: 'hidden'
      });
    case 'LOG':
      return Object.assign({}, state, {
        error: action.error
      });
    case 'TOGGLE_WELCOME':
      return Object.assign({}, state, {
        welcome: !state.welcome
      });
    case 'UPDATE_MESSAGE':
      return Object.assign({}, state, {
        i: action.i,
        message: action.message
      });
    default:
      return state;
  }
}
