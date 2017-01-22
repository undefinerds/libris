import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Layout, Main, Search, SearchBox, SearchGrid, Single, ChapterList, Chapter, ImageList, Image } from './components/index';

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
