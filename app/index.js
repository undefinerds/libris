//React and React-DOM objects
import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';

//Import routing dependencies for react-router (SPAs needed)

//Import components
import App from './App';

//Redux dependencies
import store from './store';

const rootElement = document.querySelector('#root');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
