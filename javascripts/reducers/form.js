
export default function form(state={}, action) {
  switch(action.type) {
    case 'UPDATE_VALUE':
      return Object.assign({}, state, action.values);
    case 'UPDATE_MATCHES':
      return Object.assign({}, state, {
        matches: action.matches
      });
    default:
      return state;
  }
}
