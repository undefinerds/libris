import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import Main from './components/Main';
import Search from './components/Search';
import SearchBox from './components/SearchBox';
import SearchGrid from './components/SearchGrid';
import Single from './components/Single';
import ChapterList from './components/ChapterList';
import Chapter from './components/Chapter';
import ImageList from './components/ImageList';
import Image from './components/Image';

export default (
  <Route path={'/'} component={Layout}>
    <IndexRoute component={Main} />
    <Route path={'search'} component={Search}>
      <Route path={'/'} component={SearchBox} />
      <Route path={':query'} component={SearchGrid} />
    </Route>
    <Route path={':title'} component={Single}>
      <Route path={'chapter'} component={ChapterList} />
      <Route path={'chapter/:chapterId'} component={Chapter} />
      <Route path={'image'} component={ImageList} />
      <Route path={'image/:imgId'} component={Image} />
    </Route>
  </Route>
);
