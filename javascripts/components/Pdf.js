import React, { Component } from 'react';
import PDF from 'react-pdf';

import { Link, hashHistory } from 'react-router';
import {ReadingOwl} from './Owl';
import Modal from './Modal';

class PdfReader extends Component {

  constructor(props) {
    super(props);
    this.timer = null;
    this.book = null;
    this._onDocumentCompleted = this._onDocumentCompleted.bind(this);
    this._onPageCompleted = this._onPageCompleted.bind(this);
    this.state = {
      page: 1
    };
  }

  componentWillMount() {
    const bookId = Number(this.props.params.uri), that = this;
    this.book = this.props.books[bookId];
    if(that.props.readable && bookId !== that.props.readable.bookId) {
      that.props.updateReadable('CLEAN_READABLE');
    }
    
    const initLocation = (that.props.params && Number(that.props.params.id) + 1) || that.props.readable.location + 1;
    that.props.updateReadable('UPDATE_READABLE', {
        loaded: true,
        url: that.props.books[bookId].url,
        location: initLocation
      });
  }


  _onDocumentCompleted(pages){
    this.setState({pages: pages});
  }

  _onPageCompleted(page){
    this.setState({currentPage: page});
  }

  prevChapter() {
    if(this.props.readable.location > 1) {
      this.props.updateReadable('UPDATE_READABLE', { location: this.props.readable.location - 1 });
    }
  }

  nextChapter() {
    if(this.props.readable.location < this.book.flow.length + 1) {
      this.props.updateReadable('UPDATE_READABLE', { location: this.props.readable.location + 1 });
    }
  }

  render() {
    const uri = Number(this.props.params.uri);
    const { location, url } = this.props.readable;
    console.log(url);
    
    return (
        <div className="readable">
          <nav id="ReadableBar">
          <div className="dark">
            <button onClick={hashHistory.goBack}><i className="fa fa-times"></i></button>
            <i className="fa fa-smile"></i>
          </div>
          <div className="light">
            
            <header className="title">{this.book && this.book.metadata && this.book.title}</header>

          </div>
          </nav>
          <div className={`${this.book && this.book.metadata && this.book.metadata.subject}`}>
            <nav id="navigation">
              <button onClick={this.prevChapter.bind(this)}><i className="fa fa-chevron-left fa-2x"></i></button>
              <button onClick={this.nextChapter.bind(this)}><i className="fa fa-chevron-right fa-2x"></i></button>
            </nav>
            <section id="container" style={ { maxWidth: '90%', margin: 'auto' } }>
              <PDF file={url} page={this.state.page} scale={1} onDocumentComplete={this._onDocumentCompleted} onPageComplete={this._onPageCompleted} loading={<ReadingOwl bookName='B' />} />
            </section>
          </div>
          {this.props.readable && this.props.readable.paused && this.displayPauseMessage('¡A descansar!')}
        </div>
    )
  }
}

export default PdfReader;