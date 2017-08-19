import React from 'react';
import moment from 'moment';
import {map, sortBy} from 'lodash';

require("./header.scss");

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.onItemClick = (event) => {
            this.props.onBackClick();
        }
        this.onLeftArrowClick = (event) => {
            this.props.onLeftArrowClick();
        }
        this.onRightArrowClick = (event) => {
            this.props.onRightArrowClick();
        }
    }
    componentDidMount() {
        if(this.props.loading === true) {
            this.props.onInitialLoad();
        }
    }
    render() {
        let entries = this.props.entries;
        let options = map(sortBy(entries, function(entry) { return Date.now() - entry.date }), (entry) => {
            let date = new Date(Number.parseInt(entry.date));
            let prettyDate = moment(date).format("MMM Do YYYY");
            return ( 
                <a className="item" href="#" onClick={this.changeHandler} key={entry.date} id={entry.date}>
                    {entry.title}
                </a>
            )
        });
        return (
            <div className="ui fixed menu">
                <div className="ui container">
                    <a href="#" className="header item">
                    JamesonNetworks Blog
                    </a>
                    <a className="ui simple item" onClick={this.onLeftArrowClick}>Previous</a>
                    <div className="right menu">
                        <a className="ui simple item right" onClick={this.onRightArrowClick}>Next</a>
                        <div className="ui simple dropdown item">
                            Articles
                            <i className="dropdown icon"></i>
                            <div className="menu">
                                {options}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
