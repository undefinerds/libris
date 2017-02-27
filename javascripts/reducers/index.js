import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import books from './books';
import loader from './loader';
import form from './form';
import readable from './readable';
import config from './config';

const rootReducer = combineReducers({
  books,
  loader,
  form,
  readable,
  config,
  routing
});

export default rootReducer;
