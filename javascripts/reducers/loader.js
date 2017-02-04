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
    default:
      return state;
  }
}
