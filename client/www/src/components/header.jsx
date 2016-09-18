import React from 'react';
import {fadeOut} from '../main/util';

require("./header.scss");

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.onHeadshotClick = (event) => {
            fadeOut(this.props.onBackClick);
        }
    }

    render() {
        return (
            <div className="header">
                <img onClick={this.onHeadshotClick} className="headshot" src="https://secure.gravatar.com/avatar/d9cb6cfd91d71964be0ab1bd5d2cb4ab"/>
            </div>
        );
    }
}

export default Header;
