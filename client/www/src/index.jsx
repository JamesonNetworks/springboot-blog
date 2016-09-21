import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import $ from 'jquery';

import thunk from 'redux-thunk';

import blogGuts from './main';
import App from './app.jsx';

require('./index.scss');

let blog = createStore(
    blogGuts,
    applyMiddleware(thunk)
);

const render = function() {
    ReactDOM.render(
        <Provider store={blog}>
            <App/>
        </Provider>,
        document.getElementById('app')
    );
};

blog.subscribe(render);
render();
