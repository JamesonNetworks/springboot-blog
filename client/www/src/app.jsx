import React from 'react';
import Header from './containers/header-container.jsx';
import Footer from './containers/footer-container.jsx';
import Menu from './containers/menu-container.jsx';
import Entry from './containers/entry-container.jsx';
import $ from 'jquery';

require('./app.scss');
require('./main/prettify.js');

class App extends React.Component {
    render() {
        let appClass = this.props.store.loading ? 'app hide' : 'app';
        return (
            <div className={appClass}>
                <Header/>
                <Menu/>
                <Entry/>
                <Footer/>
            </div>
        );
    }
}

export default App;
