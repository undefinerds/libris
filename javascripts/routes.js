import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import Layout from './components/Layout';
import Main from './components/Main';
import Preview from './components/Preview';
import EpubReader from './components/Chapter';
import Image from './components/Image';
import NotFound from './components/NotFound';
import PDFReader from './components/Pdf';

export default (
  // Searchroute
  <Route path={'/'} component={Layout}>
    <IndexRoute component={Main} />
  //Book route
    <Route path={':uri'} component={Preview} />
    <Route path={'epub/:uri/read'} component={EpubReader} />
    <Route path={'epub/:uri/read/:id'} component={EpubReader} />
    <Route path={'pdf/:uri/read/:id'} component={PDFReader} />
    <Route path={':uri/image'} component={Image} />
    <Route path={':uri/image/:id'} component={Image} />
    <Route path="*" component={NotFound} />
  </Route>
);
