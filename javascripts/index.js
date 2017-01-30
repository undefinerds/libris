import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, IndexRoute, Router, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import routes from './routes';
//import Layout from './components/Layout';
//import Single from './components/Single';
// Sync history and cache with store
const history = syncHistoryWithStore(createMemoryHistory('/'), store);

render(
  <Provider store={store}>
    <Router history={history}>
    { routes }
    </Router>
  </Provider>,
  document.getElementById('root')
);
