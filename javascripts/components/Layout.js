import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

//Passing the state through components via props
function mapStateToProps(state) {
  return Object.assign({}, state);
}

// Binding to props! This is like a cake
// Mixing up all the ingredients
// to put a single thing to the oven
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

class App extends Component {
  props: {
    children: HTMLElement
  }
  render() {
    return (
      <div>
        { React.cloneElement(this.props.children, this.props) }
      </div>
    )
  }
}

const Layout = connect(mapStateToProps, mapDispatchToProps)(App);

export default Layout;
