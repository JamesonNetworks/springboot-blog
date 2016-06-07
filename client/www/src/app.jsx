import React from 'react';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Menu from './containers/menu-container.jsx';
import Entry from './containers/entry-container.jsx';
import $ from 'jquery';

require('./app.scss');
require('./main/prettify.js');

class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Menu/>
                <Entry/>
                <Footer/>
            </div>
        );
    }
}

export default App;
