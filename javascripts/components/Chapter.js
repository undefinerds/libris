import React, { Component } from 'react';
import { Link } from 'react-router';
import { read, getImage } from '../actions';
import {Parser, ProcessNodeDefinitions} from 'html-to-react';
import {ReadingOwl} from './Owl';
import run from '../../lib/run';
import Promise from 'promise';

const HTR = new Parser();

class Chapter extends Component {

  constructor(props) {
    super(props);
    this.book = null;
  }

  componentWillMount() {
    const bookId = Number(this.props.params.uri), that = this;
    read(this.props.books[bookId].url, bookId).then(book => {
      that.book = book;
      const initLocation = (that.props.params && that.props.params.id) || that.props.readable.location;
      if(bookId !== that.props.readable.bookId) {
        that.props.updateReadable('CLEAN_READABLE');
      }
      that.props.updateReadable('UPDATE_READABLE', { loaded: true, bookId, location: initLocation });
      that.setChapter.call(that);
    }).catch(e => this.props.updateReadable('READABLE_REPORT_ERROR', null, e));
  }

  setChapter() {
    const {location} = this.props.readable;
    this.props.updateReadable('UPDATE_READABLE', { loaded: false });
    const chapterId = this.book.flow[location].id, that = this;
    this.book.getChapter(chapterId, function(err, text) {
      if(err) return this.props.updateReadable('READABLE_REPORT_ERROR', null, e);
      Promise.all(text.split(/img src="\/\d\/image\//i).map((chunk, i) => {
        if(i === 0) {
          return Promise.resolve(chunk);
        }
        const end = chunk.indexOf('"');
        console.log(chunk.slice(0, end));
        const imageId = chunk.slice(0, end).split('/')[0];
        console.log(imageId);
        return new Promise((resolve, reject) => {
          getImage(that.book, imageId)
          .then(img => resolve(img + chunk.slice(end)), reject);
        });
      }))
      .then(texts => {
        const chapterText = '<div class="chapter">' + texts.join('img src="') + '</div>';
        that.props.updateReadable('UPDATE_READABLE', { loaded: true, chapterText });
        console.log(chapterText);
      })
      .catch(e => that.props.updateReadable('READABLE_REPORT_ERROR', null, e));
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.readable.location !== this.props.readable.location) {
      this.setChapter.call(this);
    }
  }

  prevChapter() {
    this.props.updateReadable('UPDATE_READABLE', { location: this.props.readable.location - 1 });
  }

  nextChapter() {
    this.props.updateReadable('UPDATE_READABLE', { location: this.props.readable.location + 1 });
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

  render() {
    const uri = Number(this.props.params.uri);
    return (
        <div className={`readable ${this.book.metadata && this.book.metadata.subject}`}>
          <Link to='/'>Volver al Inicio</Link>
          <div style={{position: 'absolute', height: '80%', top: '10%', left: '0'}}>
            <section>
            <nav>
              <button onClick={this.prevChapter.bind(this)}>Back</button>
              <button onClick={this.nextChapter.bind(this)}>Next</button>
            </nav>
            {this.props.readable.loaded ?
              !!this.props.readable.chapterText && this.htmlParser.call(this, this.props.readable.chapterText) : <ReadingOwl bookName='B' />}
            </section>
          </div>
        </div>
    )
  }
}

Chapter.defaultProps = {
  readable: {
    location: 0,
    loaded: false,
    chapterText: null
  }
}

export default Chapter;

