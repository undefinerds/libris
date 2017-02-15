import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import Loader from './Loader';
import { InstructionOwl } from './Owl';

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
  }

  componentWillMount() {
    if(this.props.books.length === 0)
    this.props.initializeStore();
    return 0;
  }

  handleMessage() {
    if(this.props.i < instructions.length) {
      this.props.updateMessage({ i: this.props.i + 1 });
    } else {
      this.props.toggleWelcome();
      this.props.updateMessage({ i: 0 });
    }
  }

  welcome() {
    console.log(this.props.loader.i);
    return (
      <div style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'rgba(10, 10, 10, 0.6)', zIndex: '500'}}>
        <button onClick={this.props.toggleWelcome} style={{ position: 'absolute', bottom: '5%', left: '50%', width: '110px', marginLeft: '-55px', background: 'none', border: 'none', textTransform: 'uppercase', color: '#FEFEFE'}}>Ignorar</button>
        <InstructionOwl {...this.props} className="open-eye" styles={{left: '70%'}} message={this.props.loader.message} leftHand={90} handleMessage={() => this.handleMessage} />
      </div>
    )
  }


  render() {
    return (
      <div>
        <Loader {...this.props} />
        {this.props.loader.welcome && this.welcome.call(this)}
        { React.cloneElement(this.props.children, this.props) }
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);
