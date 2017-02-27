import React, { Component } from 'react';
import '../../stylesheets/modal.css';


class Modal extends Component {
  render() {
    return (
      <div className="modal">
        <div className="modalBox">
          {this.props.onClose && <button id="closeModal" onClick={this.props.onClose}>&times;</button>}
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Modal;
