import { createStore, compose } from 'redux';
//import { thunkMiddleware } from 'redux-thunk';
import rootReducer from './reducers';

export function configureStore(initialState: Object | void) {
  return createStore(rootReducer, initialState, compose(
    window.devToolsExtension ?
    window.devToolsExtension() :
    f => f)
  );
}

const store = configureStore({});

export default store;