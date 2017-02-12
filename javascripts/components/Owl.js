import React, { Component } from 'react';
import style from '../../stylesheets/owl.css';

export default class Owl extends Component {
  render() {
    return (
      <div className={`owl ${this.props.className}`}>
        <div className="ear ear-left"></div>
        <div className="ear ear-right"></div>
        <div className="eye eye-left">
          <div className="pupil"></div>
        </div>
        <div className="eye eye-right">
          <div className="pupil"></div>
        </div>
        <div className="nose"></div>
        {this.props.children}
      </div>
    )
  }
}


export class ReadingOwl extends Component {

  render() {
    const bookName= !!(this.props.bookName) ? this.props.bookName : 'Charlie y la Fábrica de Chocolates';
    return (
        <Owl className={'reading'}>
          <div className="book">
          <div className="left"></div>
          <div className="right history">
            <span>{bookName}</span>
          </div>
        </div>
        </Owl>
    )
  }
}

export class InstructionOwl extends Component {
  render() {
    const { message, i } = this.props;
    return (
        <Owl className={'teaching'}>
        <div className="message">
        {message}
        <button onClick={this.props.handleMessage}>Siguiente</button>
        </div>
        </Owl>
    )
  }
}
