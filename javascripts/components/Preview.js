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

    const i = Number(this.props.params.uri);
    
    this.state = {
      showModal: false,
      book: this.props.books[i],
      i
    };
   
    this.mountForm = this.mountForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createLink = this.createLink.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      book: nextProps.books[Number(nextProps.params.uri)]
    })
  }

  spanish(word) {
    word = word.toLowerCase();
    switch(word) {
      case 'author':
        return 'Autor';
      case 'subject':
        return 'Género';
      case 'pubdate':
        return 'Fecha de publicación';
      case 'description':
        return 'Descripción';
      case 'type':
        return 'Tipo';
      case 'views':
        return 'Visto';
      case 'edition':
        return 'Edición';
      case 'editorial':
        return 'Editorial';
      default:
        return word;
    }
  }

  handleChange(refs) {
    this.setState({ showModal: false });
    this.props.editBook(refs, this.state.i);
  }

  mountForm() {
    return (
      <Modal onClose={() => this.setState({ showModal: false })}>
        <Edit book={this.state.book} onSubmit={this.handleChange} />
      </Modal>
    )
  }

  createLink(element) {
    const { book, i } = this.state;
    /*return (book.type === 'epub') ?
    (*/
      return (<Link to={`/${book.type}/${i}/read`}>{element}</Link>);
    /*) :
    (
      <a href={book.url} target="_blank">{element}</a>
    );*/

  }

  render() {
    const {book, i} = this.state;
    return (
      <div style={styles} className="preview">
      <nav id="AppBar">
        <button className="no-btn" onClick={hashHistory.goBack}><i className="fa fa-chevron-left fa-2x"></i></button>
        <span className="title">{book && book.title}</span>
        { this.createLink(<button className="line">Leer</button>) }
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
              {this.createLink(<button><i className="fa fa-eye"></i> {book.views}</button>)}
            </figcaption>
          </figure>
          {[...Object.keys(book)].filter(k => !(['title', 'cover', 'metadata', 'chapters'].includes(k))).map((key, i) => <Paragraph key={i} subtitle={this.spanish(key)} paragraph={book[key]} />)}
        </article>
        <article className="clearfix">
          {this.createLink(<button>Leer</button>)}
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
