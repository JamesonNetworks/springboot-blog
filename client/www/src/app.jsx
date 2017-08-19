import React from 'react';
import Header from './containers/header-container.jsx';
import Footer from './containers/footer-container.jsx';
import Menu from './containers/menu-container.jsx';
import Entry from './containers/entry-container.jsx';

require('../semantic/dist/semantic.min.css');
require('./app.scss');

class App extends React.Component {
    render() {
        return (
            <div className="ui main text container divided grid">
                <Header/>
                <Entry/>
                <Footer/>
            </div>
        );
    }
}

export default App;
