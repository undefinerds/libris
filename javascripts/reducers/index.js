import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import books from './books';
import loader from './loader';
const rootReducer = combineReducers({
  books,
  loader,
  routing
});

export default rootReducer;
