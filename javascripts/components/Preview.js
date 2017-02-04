import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from '../../stylesheets/preview.css';


class Paragraph extends Component {
  render() {
    return (
      <p><strong>{this.props.subtitle}</strong>{this.props.paragraph}</p>
    )
  }
}

class Preview extends Component {
  createParagraph(subtitle, paragraph) {
    if(!!paragraph)
      return (<Paragraph subtitle={subtitle} paragraph={paragraph} />)
    else
      return (<Paragraph subtitle={subtitle} paragraph='Sin definir' />)
  }

  render() {
    let i = Number(this.props.params.uri);
    const book  = this.props.books[i];
    return (
      <div style={styles} className="preview">
      <nav><Link to="/">&times;</Link></nav>
      <section>
        <header>
          <h1>{book.title}</h1>
        </header>
        <article>
          <img src={book.cover} />
          {[...Object.keys(book)].filter(k => !(['title', 'cover', 'chapters'].includes(k))).map((key, i) => <Paragraph key={i} subtitle={key} paragraph={book[key]} />)}
        </article>
      </section>
      </div>
    )
  }
}

export default Preview;
