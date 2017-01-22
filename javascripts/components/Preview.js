import React, { Component } from 'react';
import { Link } from 'react-router';

class Preview extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Titulo del Libro</h1>
        </header>
        <Link to='/'>Volver al Inicio</Link>
      </div>
    )
  }
}

export default Preview;
