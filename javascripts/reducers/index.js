import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import books from './books';
import loader from './loader';
import form from './form';
import readable from './readable';

const rootReducer = combineReducers({
  books,
  loader,
  form,
  readable,
  routing
});

export default rootReducer;
