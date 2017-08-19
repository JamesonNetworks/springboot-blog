import React from 'react';
import moment from 'moment';
import {each, map, sortBy, filter, reverse} from 'lodash';

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
        this.changeHandler = (event) => {
            var self = this;
            var entry_date = event.currentTarget.id;
            var entries = this.props.entries;
            var entry = filter(entries, (entry) => { return entry.date === entry_date; });


            self.props.onChange(entry[0]);
        }
    }
    componentDidMount() {
        if(this.props.loading === true) {
            this.props.onInitialLoad();
        }
    }
    render() {
        let entries = this.props.entries;
        let years = {};
        var self = this;
        each(sortBy(entries, function(entry) { return Date.now() - entry.date }), (entry) => {
            let date = new Date(Number.parseInt(entry.date));
            let prettyDate = moment(date).format("MMM Do YYYY");
            let year = prettyDate.substring(prettyDate.length - 4, prettyDate.length);
            if(_.isUndefined(years[year])) {
                years[year] = {};
                years[year].year = year;
                years[year].entries = [];
            }
            years[year].entries.push(entry);
        });
        let options = reverse(map(years, function(year) {
            let articles = map(year.entries, function(entry) {
                let date = new Date(Number.parseInt(entry.date));
                let prettyDate = moment(date).format("MMM Do YYYY");
                return (
                    <a className="item" href="#" onClick={self.changeHandler} key={entry.date} id={entry.date}>
                        {entry.title} - {prettyDate}
                    </a>
                );
            });
            return (
                <div className="item" href="#">
                    <i className="dropdown icon"></i>
                    {year.year}
                    <div className="menu">
                        {articles}
                    </div>
                </div>
            );
        }));
        return (
            <div className="ui fixed menu">
                <div className="ui container">
                    <a className="ui simple item" onClick={this.onLeftArrowClick}>Previous</a>
                    <div className="ui simple dropdown item">
                        Articles
                        <i className="dropdown icon"></i>
                        <div className="menu">
                            {options}
                        </div>
                    </div>
                    <div className="right menu">
                        <a className="ui simple item right" onClick={this.onRightArrowClick}>Next</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
