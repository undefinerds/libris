import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, IndexRoute, Router, createMemoryHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import routes from './routes';

// Sync history and cache with store
const history = syncHistoryWithStore(createMemoryHistory('/'), store);

render(
  <Provider store={store} history={history}>
    <Router history={hashHistory}>
    { routes }
    </Router>
  </Provider>,
  document.getElementById('root')
);

