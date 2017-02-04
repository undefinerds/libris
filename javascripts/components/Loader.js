import React, { Component } from 'react';
import styles from '../../stylesheets/loader.css';

class Loader extends Component {
  render() {
    return (
      <div style={styles}>
        <article id="loaderContainer" className={this.props.loader.show}>
          <div id="loader">
            <div className="owl">
              <div className="ear ear-left"></div>
              <div className="ear ear-right"></div>
              <div className="eye eye-left">
                <div className="pupil"></div>
              </div>
              <div className="eye eye-right">
                <div className="pupil"></div>
              </div>
              <div className="nose"></div>
              <div className="book">
                  <div className="left"></div>
                  <div className="right"></div>
              </div>
            </div>
          </div>
          <p>Cargando</p>
        </article>
      </div>
    )
  }  
}

export default Loader;
