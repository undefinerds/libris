import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import Loader from './Loader';

//Passing the state through components via props
function mapStateToProps(state) {
  return {
    loader: state.loader,
    books: state.books,
    form: state.form
  };
}

// Binding to props! This is like a cake
// Mixing up all the ingredients
// to put a single thing to the oven
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

                      

class Layout extends Component {

  componentWillMount() {
    if(this.props.books.length === 0)
    this.props.initializeStore();
    return 0;
  }

  render() {
    return (
      <div>
        <Loader {...this.props} />
        { React.cloneElement(this.props.children, this.props) }
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
