import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import Layout from './components/Layout';
import Main from './components/Main';
import Preview from './components/Preview';
import EpubReader from './components/Chapter';
import NotFound from './components/NotFound';
import PdfReader from './components/Pdf.js';
export default (
  // Searchroute
  <Route path={'/'} component={Layout}>
    <IndexRoute component={Main} />
  //Book route
    <Route path={':uri'} component={Preview} />
    <Route path={'epub/:uri/read'} component={EpubReader} />
    <Route path={'epub/:uri/read/:id'} component={EpubReader} />
    <Route path={'pdf/:uri/read'} component={PdfReader} />
    <Route path={'pdf/:uri/read/:id'} component={PdfReader} />
    <Route path="*" component={NotFound} />
  </Route>
);
