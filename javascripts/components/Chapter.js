import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Link, hashHistory } from 'react-router';
import { read, getImage } from '../actions';
import {Parser, ProcessNodeDefinitions} from 'html-to-react';
import {ReadingOwl} from './Owl';
import Modal from './Modal';
import run from '../../lib/run';
import Promise from 'promise';
import style from '../../stylesheets/readable.css';

const HTR = new Parser();

class Chapter extends Component {

  constructor(props) {
    super(props);
    this.book = null;
    this.timer = null;
    this.state = {
      proportions: {
      }
    };
  }

  componentWillMount() {
    const bookId = Number(this.props.params.uri), that = this;
    read(this.props.books[bookId].url, bookId).then(book => {
      that.book = book;
      //No importa si el numero del parametro es 0 (que equivale a false) igual lo tomara por readable
      const initLocation = (that.props.params && Number(that.props.params.id)) || that.props.readable.location;
      if(bookId !== that.props.readable.bookId) {
        that.props.updateReadable('CLEAN_READABLE');
      }
      that.props.updateReadable('UPDATE_READABLE', { loaded: true, bookId, location: initLocation, position: 0 });
      that.setChapter.call(that);
    }).catch(e => this.props.updateReadable('READABLE_REPORT_ERROR', null, e));
  }

  componentDidMount() {
    this.setTimer.call(this);
    const i = Number(this.props.params.uri);
    this.props.editBook({ views: this.props.books[i].views + 1}, i);
  }

  setTimer() {
    this.props.startReading();
    this.timer = setTimeout(this.pauseReading.bind(this), 7200000);
  }

  pauseReading() {
    this.props.stopReading();
    setTimeout(this.setTimer.bind(this), 30000);
  }

  setChapter() {
    const {location} = this.props.readable;
    this.props.updateReadable('UPDATE_READABLE', { loaded: false });
    const chapterId = this.book.flow[location].id, that = this;
    this.book.getChapter(chapterId, function(err, text) {
      if(err) return this.props.updateReadable('READABLE_REPORT_ERROR', null, e);
      Promise.all(text.split(/img src=\"file:\S+\/image\/|img src=\"\/epub\/\d+\/image\//i).map((chunk, i) => {
        if(i === 0 || chunk.charAt(0).match(/\D/)) {
          return Promise.resolve(chunk);
        }
        const end = chunk.indexOf('"');
        const imageId = chunk.slice(0, end).split('/')[0];
        return new Promise((resolve, reject) => {
          getImage(that.book, imageId)
          .then(img => resolve(img + chunk.slice(end)), reject);
        });
      }))
      .then(texts => {
        const chapterText = '<div class="chapter">' + texts.join('img src="') + '</div>';
        that.props.updateReadable('UPDATE_READABLE', { loaded: true, chapterText });
        console.log(that.book);

        const style = that.book.manifest[Object.keys(that.book.manifest).filter(ex => /(style|css)/i.test(ex)).pop()];
        if(style) {
          that.book.getFile(style.id, function(err, data, mimeType) {
            data = data.toString('utf8').replace(/(html|body)/i, '#container');
            that.props.updateReadable('UPDATE_READABLE', { css: data });
          });
        }
        if(that.state.proportions.columns === undefined) {
          setTimeout(that.setEpubView.bind(that), 3000);
        }
      })
      .catch(e => that.props.updateReadable('READABLE_REPORT_ERROR', null, e));
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.readable.location !== this.props.readable.location) {
      this.setChapter.call(this);
    }
  }

  setEpubView() {
    let {height, width, columns, columnWidth} = this.state;
    if(!height) height = this.state.proportions.height || Number(window.getComputedStyle(findDOMNode(this.refs.chapter)).getPropertyValue("height").replace(/(px|em|rem|\%)$/g, ''));
    if(!width) width = this.state.proportions.width || Number(window.getComputedStyle(findDOMNode(this.refs.chapter)).getPropertyValue("width").replace(/(px|em|rem|\%)$/g, ''));
    if(!columns) columns = Math.round((height - 40) / 400);
    // 400px ~ 25 lines because 1 line 1rem and 1rem is 16px (at least the init)
    if(!columnWidth) columnWidth = (width - 40) / 2;
    this.setState({
      proportions: {
        height,
        width,
        columns,
        columnWidth
      }
    });
    console.log(this.state);
  }

  prevChapter() {
    if(this.props.readable.position === 0 && this.props.readable.location > 0) {
      this.props.updateReadable('UPDATE_READABLE', { location: this.props.readable.location - 1, position: 0 });
    } else if(this.props.readable.position > 0) {
      this.props.updateReadable('UPDATE_READABLE', { position: this.props.readable.position - 100 });
    } else {
      return ;
    }
  }

  nextChapter() {
    if(this.props.readable.position === this.state.proportions.columns * 100 && this.props.readable.location < this.book.flow.length) {
      this.props.updateReadable('UPDATE_READABLE', { location: this.props.readable.location + 1, position: 0 });
    } else if(this.props.readable.position < this.state.proportions.columns * 100) {
      this.props.updateReadable('UPDATE_READABLE', { position: this.props.readable.position + 100 });
    }
    else {
      return ;
    }
  }

  htmlParser(data) {
    const that = this;
    const isValidNode = () => true;
    // Order matters. Instructions are processed in the order they're defined 
    const processNodeDefinitions = new ProcessNodeDefinitions(React);
    const processingInstructions = [
      {
        // Custom <a> processing 
        shouldProcessNode: function(node) {
            return node.name && node.name === 'a';
        },
        processNode: function(node, children) {
          const { href } = node.attribs;
          return <Link to={href}>{children}</Link>;
        }
      },
      {
          // Anything else 
          shouldProcessNode: function(node) {
              return true;
          },
          processNode: processNodeDefinitions.processDefaultNode
      }
    ];
    return HTR.parseWithInstructions(data, isValidNode, processingInstructions);
  }

  changeLocation(location) {
    this.props.updateReadable('UPDATE_READABLE', { location });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  displayPauseMessage(message) {
    return (
      <Modal>
        <div style={{textAlign: 'center'}}>
          <i className="fa fa-pause fa-5x"></i>
          <p>{message}</p>
        </div>
      </Modal>
    )
  }

  toggleAside() {
    this.props.updateReadable('UPDATE_READABLE', { toggleTOC: !this.props.toggleTOC });
  }

  bookmarkText() {
    const text = window.getSelection().toString();
    console.log(text);
  }

  render() {
    /* columns es el 100%
    el 100% de la actual pag es ese porcentaje, por ende
    columns --- > percent
    position---> x= ?*/
    const uri = Number(this.props.params.uri);
    const { toggleTOC, css, location, position } = this.props.readable;
    const chapterPercent = (this.book && this.book.flow && location !== 0) ? Math.round(Number(location) * 100 / Number(this.book.flow.length)) : 0;
    return (
        <div className="readable">
          <nav id="ReadableBar">
          <div className="dark">
            <button onClick={hashHistory.goBack}><i className="fa fa-times"></i></button>
            <span>{ (this.state.proportions.columns && location !== 0) ? Math.round(((this.props.readable.position / 100) * chapterPercent + chapterPercent) / this.state.proportions.columns)  + '%' : '0%' }</span>
            <i className="fa fa-smile"></i>
          </div>
          <div className="light">
            <button onClick={this.toggleAside.bind(this)}><i className="fa fa-bars fa-2x"></i></button>
            <header className="title">{this.book && this.book.metadata && this.book.title}</header>
            <button onClick={this.bookmarkText}><i className="fa fa-bookmark fa-2x"></i></button>
          </div>
          </nav>
          <div className={`${this.book && this.book.metadata && this.book.metadata.subject}`}>
            <section>
              <aside className={(toggleTOC) ? 'show-aside' : 'hidden'}>
                <ol>
                {this.book && this.book.flow && this.book.flow.map((ch, i) => (<li key={i}><button onClick={this.changeLocation.bind(this, i)}>{ch.title || ch.id}</button></li>))}
                </ol>
              </aside>
            <nav id="navigation">
              <button onClick={this.prevChapter.bind(this)}><i className="fa fa-chevron-left fa-2x"></i></button>
              <button onClick={this.nextChapter.bind(this)}><i className="fa fa-chevron-right fa-2x"></i></button>
            </nav>
            <article style={ { maxWidth: '100%', maxHeight: '70vh', bottom: '10%' } }>
              <style>{css}</style>
              <div ref="chapter" className="container" style={{ columns: (this.state.proportions.columnWidth) ? `${this.state.proportions.columnWidth}px` : 2, left: (position !== 0) ? `-${position}%` : '0%', height: (this.state.proportions.columnWidth) ? '400px' : '' }}>
                {this.props.readable.loaded ?
                  !!this.props.readable.chapterText &&
                  this.htmlParser.call(this, this.props.readable.chapterText) :
                  <ReadingOwl bookName='B' />}
              </div>
            </article>
            </section>
          </div>
          {this.props.readable && this.props.readable.paused && this.displayPauseMessage('¡A descansar!')}
        </div>
    )
  }
}

Chapter.defaultProps = {
  readable: {
    location: 0,
    loaded: false,
    chapterText: null,
    toggleTOC: false
  }
}

export default Chapter;

