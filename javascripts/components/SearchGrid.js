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

  categorize = () => {
    const { indexGrid, books } = this.props;
    let subjects = indexGrid
    .map(i => (books[i].subject) ? books[i].subject.split(/, ?/g) : 'sin categoría')
    .reduce((a, b) => (typeof a === typeof '') ? [a].concat(b) : a.concat(b))
    .filter((subject, i, arr) => arr.indexOf(subject) === i);
    return (
      <div>
        { subjects.map(sub => (
          <article className="grid" key={sub}>
            <h3 className="subtitle">{sub}</h3>
            <hr />
            {indexGrid
              .filter((i) => books[i].subject.includes(sub))
              .map(i => <Book key={i} i={i} book={books[i]} />)} 
          </article>
        )) }
      </div>
    );
  }

  render() {
    const { indexGrid, books } = this.props;
    return (
      <section style={styles}>
        { indexGrid && indexGrid.length > 0 && books.length > 0 && this.categorize() }
      </section>
    )
  }
}

export default SearchGrid;
