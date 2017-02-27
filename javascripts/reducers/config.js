
const initialState = {
  directory: 'default',
  extensions: ['epub'],
  fontSize: '16px',
  fontFamily: 'serif'
};

export default function (state=initialState, action) {
  switch(action.type) {
    case 'NEW_CONFIG':
      return {
        ...state,
        ...action.data
      }
    default:
      return state;
  }
}