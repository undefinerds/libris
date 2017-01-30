import { SHOW, HIDE } from '../consts';

export default function loader(state={}, action) {
  switch(action.type) {
    case SHOW:
      return Object.assign({}, state, {
        show: true
      });
    case HIDE:
      return Object.assign({}, state, {
        show: false
      });
    case 'LOG':
      return Object.assign({}, state, {
        error: action.error
      });
    default:
      return state;
  }
}
