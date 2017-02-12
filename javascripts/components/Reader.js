import React, { Component } from 'react';
import styles from './style';
import ePub from 'epubjs';

global.ePub = ePub;
//global.URL = require("epubjs/libs/url/url.js");

class Reader extends Component {
  constructor(props) {
    super(props);
    global.book = null;
    global.rendition = null;
  }

  componentWillMount() {
    const {url} = this.props;
    global.book = global.ePub({ restore: true });
    glonal.book.open(url);
  }

  componentDidMount() {
    global.book.ready(function() { console.log('Done!'); });
  }
  prevPage() {
    global.book.prevPage();
  }

  nextPage() {
    global.book.nextPage();
  }

  render() {
    console.log(global.book);
    return (
      <div>
        <nav>
          <button onClick={this.prevPage}>Back</button>
          <button onClick={this.nextPage}>Next</button>
        </nav>
        <div ref="area"></div>
      </div>
    )
  }
}

export default Reader;
