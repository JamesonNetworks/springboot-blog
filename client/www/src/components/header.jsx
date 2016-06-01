import React from 'react';

require("./header.scss");

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <img src="/images/header.png"/>
            </div>
        );
    }
}

export default Header;
