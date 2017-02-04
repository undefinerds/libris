import React, { Component } from 'react';
import { Link } from 'react-router';

class Preview extends Component {
  render() {
    return (
      <div>
        <nav><Link to="/">&times;</Link></nav>
      {this.props.children}
      </div>
    )
  }
}

export default Preview;
