import React, { Component } from 'react';
import {ReadingOwl} from './Owl';
import styles from '../../stylesheets/loader.css';

class Loader extends Component {
  render() {
    return (
      <div style={styles}>
        <article id="loaderContainer" className={this.props.loader.show}>
          <div id="loader">
            <ReadingOwl className="turn-eyes" bookName={this.props.letter || 'H'} />
          </div>
          <p>Cargando</p>
        </article>
      </div>
    )
  }  
}

export default Loader;
