import React, { Component } from 'react';
import SearchGrid from './SearchGrid';

class Search extends Component {
  render() {
    let { bookGrid } = this.props;
    if(!bookGrid || books.length < 1)
      if(this.props.books.length === 0)
        return (<div></div>);
      else
        bookGrid = this.props.books;
    return (
      <header>
        <h1>Busqueda!</h1>
        <SearchGrid {...this.props} bookGrid={bookGrid} />
      </header>
    )
  }
}

export default Search;
