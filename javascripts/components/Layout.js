import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import Loader from './Loader';
import { hashHistory } from 'react-router';
import { InstructionOwl } from './Owl';
import { INSTRUCTIONS } from '../consts';

// Passing the state through components via props
function mapStateToProps(state) {
  return {
    loader: state.loader,
    books: state.books,
    form: state.form,
    readable: state.readable,
    config: state.config
  };
}

// Binding to props! This is like a cake
// Mixing up all the ingredients
// to put a single thing to the oven
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

                      

class Layout extends Component {
  constructor(props) {
    super(props);
    this.welcome = this.welcome.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.changeDir = this.changeDir.bind(this);
  }

  componentWillMount() {
    if(this.props.books.length === 0)
    this.props.initializeStore();
    return 0;
  }

  componentDidUpdate(prevProps) {
    if(this.props.loader.welcome && this.props.loader.push && this.props.loader.push !== prevProps.loader.push) {
      this.changeDir(this.props.loader.push);
    }
  }

  handleMessage() {
    if(this.props.loader.i === (INSTRUCTIONS.length - 1)) {
      this.props.updateMessage(0);
      this.props.toggleWelcome();
    } else {
      this.props.updateMessage(this.props.loader.i + 1);
    }
  }

  welcome() {
    return (
      <div style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'rgba(10, 10, 10, 0.6)', zIndex: '500'}}>
        <button className='line' id="ignoreButton" onClick={this.props.toggleWelcome}>Ignorar</button>
        <InstructionOwl className="open-eye" {...this.props.loader}
          message={this.props.loader.message}
          x={this.props.loader.x}
          y={this.props.loader.y}
          leftHand={this.props.loader.leftHand}
          rightHand={this.props.loader.rightHand}
          handleMessage={this.handleMessage} />
      </div>
    )
  }

  changeDir(push) {
    console.log('funciono con ');
    console.log(push);
    if(push) {
      if(/\/read/gi.test(push)) {
        const i = parseInt(push.slice(1, push.indexOf('r') - 1));
        const book = this.props.books[i];
        push = '/' + book.type + push;
      }
      hashHistory.push(push);
    }
  }

  render() {
    const { config } = this.props;
    return (
      <div style={{ fontFamily: config.fontFace, fontSize: config.fontSize }}>
        <Loader {...this.props} />
        {this.props.loader.welcome && this.welcome() }
        { React.cloneElement(this.props.children, this.props) }
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);
