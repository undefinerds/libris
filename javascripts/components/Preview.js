import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import styles from '../../stylesheets/preview.css';
import Modal from './Modal';
import Edit from './Edit';

class Paragraph extends Component {
  render() {
    return (
      <p><strong>{this.props.subtitle}</strong> {!!(this.props.paragraph) ? this.props.paragraph : 'Sin definir'}</p>
    )
  }
}

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.i = Number(this.props.params.uri);
    this.book = this.props.books[Number(this.props.params.uri)];
    this.mountForm = this.mountForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  spanish(word) {
    word = word.toLowerCase();
    switch(word) {
      case 'author':
        return 'autor';
      case 'subject':
        return 'género';
      case 'pubdate':
        return 'fecha de publicación';
      case 'description':
        return 'descripción';
      case 'type':
        return 'tipo';
      case 'views':
        return 'visto';
      default:
        return word;
    }
  }

  handleChange(refs) {
    this.setState({ showModal: false });
    this.props.editBook(refs, this.i);
  }

  mountForm() {
    return (
      <Modal onClose={() => this.setState({ showModal: false })}>
        <Edit book={this.book} onSubmit={this.handleChange} />
      </Modal>
    )
  }

  render() {
    const {book, i} = this;
    return (
      <div style={styles} className="preview">
      <nav id="AppBar">
        <button className="no-btn" onClick={hashHistory.goBack}><i className="fa fa-chevron-left fa-2x"></i></button>
        <span className="title">{book && book.title}</span>
        <Link to={`/${book.type}/${i}/read`}><button className="line">Leer</button></Link>
      </nav>
      <header>
        <h1>{book && book.title}</h1>
        <button className="edit" onClick={() => this.setState({ showModal: true  })}><i className="fa fa-pencil fa-2x"></i></button>
      </header>
      <section>
        <article>
          <figure className="left">
            <img src={book && book.cover} alt={`Cubierta de ${book.title}`}/>
            <figcaption>
              <Link to={`/${book.type}/${i}/read`}><button><i className="fa fa-eye"></i> {book.views}</button></Link>
            </figcaption>
          </figure>
          {[...Object.keys(book)].filter(k => !(['title', 'cover', 'metadata', 'chapters'].includes(k))).map((key, i) => <Paragraph key={i} subtitle={this.spanish(key)} paragraph={book[key]} />)}
        </article>
        <article className="clearfix">
          <Link to={`/${book.type}/${i}/read`}><button>Leer</button></Link>
        </article>
      </section>
      <article>
        <h2>Contenido</h2>
        <ol>
          {book.chapters && book.chapters.map((ch, j) => <li key={j}><Link to={`/${book.type}/${i}/read/${j}`}><Paragraph subtitle={!!(ch.title) ? ch.title : ch.id} paragraph=' ' /></Link></li>)}
        </ol>
      </article>
      {this.state.showModal && this.mountForm()}
      </div>
    )
  }
}

export default Preview;
