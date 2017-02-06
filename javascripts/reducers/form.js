
export default function form(state={}, action) {
  switch(action.type) {
    case 'UPDATE_VALUE':
      return Object.assign({}, state, action.values);
    case 'UPDATE_MATCH':
      return Object.assign({}, state, {
        matches: action.data
      });
    default:
      return state;
  }
}
