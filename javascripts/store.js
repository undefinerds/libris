import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
const { connect } = require('../lib/database');

export function configureStore(initialState={}) {
  connect();
  return createStore(rootReducer, initialState, compose(applyMiddleware(thunkMiddleware),
    window.devToolsExtension ?
    window.devToolsExtension() :
    f => f)
  );
}

const store = configureStore({
  loader: { show: 'visible' },
  books: [],
  form: {
    matches: []
  },
  readable: {
    loaded: false,
    location: 0
  }
});

export default store;
