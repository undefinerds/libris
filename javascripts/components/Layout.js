import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import Loader from './Loader';
import { InstructionOwl } from './Owl';
import { INSTRUCTIONS } from '../consts';
//Passing the state through components via props
function mapStateToProps(state) {
  return {
    loader: state.loader,
    books: state.books,
    form: state.form,
    readable: state.readable
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
  }

  componentWillMount() {
    if(this.props.books.length === 0)
    this.props.initializeStore();
    return 0;
  }

  handleMessage() {
    if(this.props.loader.i === (INSTRUCTIONS.length - 1)) {
      console.log('what happened here?');
      this.props.updateMessage(0);
      this.props.toggleWelcome();
    } else {
      this.props.updateMessage(this.props.loader.i + 1);
    }
  }

  welcome() {
    return (
      <div style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'rgba(10, 10, 10, 0.6)', zIndex: '500'}}>
        <button onClick={this.props.toggleWelcome} style={{ position: 'absolute', bottom: '5%', left: '50%', width: '110px', marginLeft: '-55px', background: 'none', border: 'none', textTransform: 'uppercase', color: '#FEFEFE'}}>Ignorar</button>
        <InstructionOwl className="open-eye"
          message={this.props.loader.message}
          x={this.props.loader.x}
          y={this.props.loader.y}
          leftHand={this.props.loader.leftHand}
          rightHand={this.props.loader.rightHand}
          handleMessage={this.handleMessage} />
      </div>
    )
  }


  render() {
    return (
      <div>
        <Loader {...this.props} />
        {this.props.loader.welcome && this.welcome() }
        { React.cloneElement(this.props.children, this.props) }
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);
