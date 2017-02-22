import React, { Component } from 'react';
import style from '../../stylesheets/owl.css';

export default class Owl extends Component {
  render() {
    return (
      <div className={`owl ${this.props.className}`} style={this.props.styles}>
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
    const bookName= !!(this.props.bookName) ? this.props.bookName : 'C';
    return (
        <Owl className={'reading ' + this.props.className}>
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
    const { message, leftHand, rightHand, x, y } = this.props;
    return (
      <div onClick={this.props.handleMessage.bind(this)}>
        <Owl className={`teaching ${this.props.className}`} styles={{top: y, left: x}}>
          <div className="arm arm-left" style={(leftHand || leftHand === 0) ? {transform: `rotate(${leftHand}deg)`} : {}}></div>
          <div className="arm arm-right" style={(rightHand || rightHand === 0) ? {transform: `rotate(-${rightHand}deg)`} : {}}></div>
        </Owl>
        <div id="message" className={(this.props.messageBottom) ? 'bottom' : 'top' }>
            {message}
        </div>
      </div>
    )
  }
}
