import React, { Component } from 'react';
import { Link } from 'react-router';

// Loader :)

class Main extends Component {
  componentWillMount() {
    this.props.initializeStore();
    return 0;
  }
  render() {
    return (
      <header>
        <h1>Libris!</h1>
        <Link to="/search">Ir a busqueda</Link>
      </header>
    )
  }
}

export default Main;
