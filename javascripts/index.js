import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, IndexRoute, Router, hashHistory } from 'react-router';
import store, { history } from './store';
import routes from './routes';

render(
  <Provider store={store} history={history}>
    <Router history={hashHistory}>
    { routes }
    </Router>
  </Provider>,
  document.getElementById('root')
);

