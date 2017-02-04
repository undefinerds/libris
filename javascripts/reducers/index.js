import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import books from './books';
import loader from './loader';
import form from './form';
const rootReducer = combineReducers({
  books,
  loader,
  form,
  routing
});

export default rootReducer;
