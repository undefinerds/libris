import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from '../../stylesheets/grid.css';

class Book extends Component {
  render() {
    const { book, i } = this.props;
    return (
      <figure className="item">
        <Link to={`/${i}`} style={ {textDecoration: 'none'} }>
        <img src={book.cover} alt={`Cubierta de ${book.title}`} />
        <figcaption>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </figcaption>
        </Link>
      </figure>
    )
  }
}

class SearchGrid extends Component {
  render() {
    const { indexGrid, books } = this.props;
    return (
      <section style={styles} className="grid">
        { indexGrid.map((i, j) => <Book key={j} i={i} book={books[i]} />) }
      </section>
    )
  }
}

export default SearchGrid;
