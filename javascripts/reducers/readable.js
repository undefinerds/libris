export default function readable(state={}, action) {
  switch(action.type) {
    /*case 'CREATE_READABLE':
      return Object.assign({}, state, action.data);
    case 'ADD_CHAPTER':
      return Object.assign({}, state, {
        chapters: [...state.chapters,
          action.chapter
        ]
      });
    case 'UPDATE_CHAPTER':
      return Object.assign({}, state, {
        chapters: [
          ...state.chapters.slice(0, action.i),
          Object.assign({}, state.chapters[action.i], action.data),
          ...state.chapters.slice(action.i+1)
        ]
      });*/
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
    default:
      return state;
  }
}
