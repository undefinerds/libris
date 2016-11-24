import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions';

import Main from './Main';

/* First Function: Map State to Props,
receive the state, return a
new object with anything from the state.
   Second Function: Map Dispatch to Props,
receive the dispatch,
return the action creators. */

const App = connect((state => { books: state.books }), (dispatch => bindActionCreators(actionCreators, dispatch)))(Main);

export default App;
