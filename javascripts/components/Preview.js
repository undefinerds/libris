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
        <button>Leer</button>
      </nav>
      <header>
        <h1>{book.title}</h1>
      </header>
      <section>
        <article>
          <figure className="left">
            <img src={book.cover} alt={`Cubierta de ${book.title}`}/>
            <figcaption>
              <button>Leer</button>
            </figcaption>
          </figure>
          {[...Object.keys(book)].filter(k => !(['title', 'cover', 'chapters'].includes(k))).map((key, i) => <Paragraph key={i} subtitle={key} paragraph={book[key]} />)}
        </article>
        <article className="clearfix">
          <button>Leer</button>
        </article>
      </section>
      <aside>
        <h2>Contenido</h2>
        <ol>
          {book.chapters.map((ch, i) => <Paragraph key={i} subtitle={i+1} paragraph={!!(ch.title) ? ch.title : ch.id} />)}
        </ol>
      </aside>
      </div>
    )
  }
}

export default Preview;
