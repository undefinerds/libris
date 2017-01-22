import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import routes from './routes';

// Sync history and cache with store
const history = syncHistoryWithStore(createMemoryHistory('/'), store);

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
