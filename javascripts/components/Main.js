import React, { Component } from 'react';
import { Link } from 'react-router';

// Loader :)

class Main extends Component {
  componentWillMount() {
    this.props.initializeStore();
    return 0;
  }
  render() {
    let loadMessage = (<h1>Cargando...</h1>);
    return (
      <div>
      {(this.props.loader.show) ? loadMessage : <div></div>}
      <header>
        <h1>Libris!</h1>
        <Link to="/search">Ir a busqueda</Link>
      </header>
      { (this.props.loader.show && !!this.props.loader.error) ? this.props.loader.error : '' }
    </div>
    )
  }
}

export default Main;
