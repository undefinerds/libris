import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import Layout from './components/Layout';
import Main from './components/Main';
import SearchGrid from './components/SearchGrid';
import Single from './components/Single';
import Preview from './components/Preview';
import Chapter from './components/Chapter';
import ImageList from './components/ImageList';
import Image from './components/Image';

export default (
  //Searchroute
  <Route path={'/'} component={Layout}>
    <IndexRoute component={Main} />
  //Book route
    <Route path={':uri'} component={Preview} />
    <Route path={'chapter/:id'} component={Chapter} />
    <Route path={'image/:id'} component={Image} />
  </Route>
);
