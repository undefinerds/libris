import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
  render() {
    return (
      <header>
        <h1>Libris!</h1>
        { process.versions.node }
        <strong>{require('os').EOL}</strong>
        <Link to="/search">Ir a busqueda</Link>
      </header>
    )
  }
}

export default Home;