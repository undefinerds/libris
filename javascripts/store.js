import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import onStateChange from 'redux-on-state-change';
import saveStore from '../lib/saveStore';
import rootReducer from './reducers';

export function configureStore(initialState={}) {
  return createStore(rootReducer, initialState, compose(applyMiddleware(thunkMiddleware, onStateChange(saveStore)),
    window.devToolsExtension ?
    window.devToolsExtension() :
    f => f)
  );
}

const store = configureStore({
  loader: {
    show: 'visible'
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
