import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
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
  loader: {
    show: 'visible',
    i: 0
  },
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

// Sync history and cache with store
export const history = syncHistoryWithStore(createMemoryHistory('/'), store);
