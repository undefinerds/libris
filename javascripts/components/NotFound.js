import React, { Component } from 'react';
import { Link } from 'react-router';
import Owl from './Owl';

class NotFound extends Component {
  render() {
    return (
      <Owl clasName={'lost'}>
      <Link style={{bottom: '0%', right: '0%', textDecoration: 'none', color: 'green'}} to="/">Volver</Link>
      </Owl>
    )
  }
}

export default NotFound;