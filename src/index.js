import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import routes from './routes';
import './styles/base.css';
import Layout from './components/Layout';

// Sync history and cache with store
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path={'/'} component={Layout}>
        { routes.map( route => (route.path === '/') ? <IndexRoute key={route.path} component={route.component}  /> : <Route key={route.path} path={route.path} component={route.component} />) }
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
