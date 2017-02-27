export default function readable(state={}, action) {
  switch(action.type) {
    case 'UPDATE_READABLE':
      return Object.assign({}, state, action.data);
    case 'EXPANED_TOC':
      return Object.assign({}, state, {
        expanedToc: !state.expanedToc
      });
    case 'CLEAN_READABLE':
      return {
        loaded: false,
        location: 0,
        chapterText: null
      }
    case 'START_TIMER':
      return Object.assign({}, state, {
        paused: false
      });
    case 'STOP_TIMER':
      return Object.assign({}, state, {
        paused: true
      });
    default:
      return state;
  }
}
