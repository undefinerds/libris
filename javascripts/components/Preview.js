import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from '../../stylesheets/preview.css';


class Paragraph extends Component {
  render() {
    return (
      <p><strong>{this.props.subtitle}</strong> {!!(this.props.paragraph) ? this.props.paragraph : 'Sin definir'}</p>
    )
  }
}

class Preview extends Component {

  render() {
    const i = Number(this.props.params.uri);
    const book = this.props.books[i];
    return (
      <div style={styles} className="preview">
      <nav id="AppBar">
        <Link to="/">Atr&aacute;s</Link>
        <span>{book.title}</span>
        <Link to={`/${i}/read`}><button>Leer</button></Link>
      </nav>
      <header>
        <h1>{book.title}</h1>
      </header>
      <section>
        <article>
          <figure className="left">
            <img src={book.cover} alt={`Cubierta de ${book.title}`}/>
            <figcaption>
              <Link to={`/${i}/read`}><button>Leer</button></Link>
            </figcaption>
          </figure>
          {[...Object.keys(book)].filter(k => !(['title', 'cover', 'chapters'].includes(k))).map((key, i) => <Paragraph key={i} subtitle={key} paragraph={book[key]} />)}
        </article>
        <article className="clearfix">
          <Link to={`/${i}/read`}><button>Leer</button></Link>
        </article>
      </section>
      <article>
        <h2>Contenido</h2>
        <ol>
          {book.chapters.map((ch, j) => <li key={j}><Link to={`/${i}/read/`}><Paragraph subtitle={!!(ch.title) ? ch.title : ch.id} paragraph=' ' /></Link></li>)}
        </ol>
      </article>
      </div>
    )
  }
}

export default Preview;
