import { createStore, combineReducers } from 'redux';

import books from './reducers/books';

const store = createStore(combineReducers({ books }));

export default store;
