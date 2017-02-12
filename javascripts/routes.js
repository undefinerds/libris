import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import Layout from './components/Layout';
import Main from './components/Main';
import Preview from './components/Preview';
import Chapter from './components/Chapter';
import Image from './components/Image';
import NotFound from './components/NotFound';

export default (
  //Searchroute
  <Route path={'/'} component={Layout}>
    <IndexRoute component={Main} />
  //Book route
    <Route path={':uri'} component={Preview} />
    <Route path={':uri/read'} component={Chapter} />
    <Route path={':uri/read/:id'} component={Chapter} />
    <Route path={':uri/image'} component={Image} />
    <Route path={':uri/image/:id'} component={Image} />
    <Route path="*" component={NotFound} />
  </Route>
);
