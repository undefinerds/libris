import React, { Component } from 'react';
import { Link } from 'react-router';
/*
      <Link to={`${i}`}>
        //<img src={book.cover} alt={`Cubierta de ${book.title}`} />
      </Link>
*/
class Book extends Component {
  render() {
    const { book, i } = this.props;
    return (
      <figure>
        <figcaption>
          <Link to={`/${i}`} style={ {textDecoration: 'none'} }><h3>{book.title}</h3></Link>
          <p>{book.author}</p>
        </figcaption>
      </figure>
    )
  }
}

class SearchGrid extends Component {
  render() {
    const { bookGrid } = this.props;
    return (
      <section>
        { bookGrid.map((book, i) => {
          const j = this.props.books.findIndex(b => b.url === book.url);
          return <Book {...this.props} key={i} book={book} i={j} />
      }) }
      </section>
    )
  }
}

export default SearchGrid;
